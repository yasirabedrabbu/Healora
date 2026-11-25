import { db } from "@/lib/db";
import { requireSession } from "@/lib/auth";
import { handleRoute, ok, fail } from "@/lib/security";
import { ambulanceSchema, parseOrThrow } from "@/lib/validate";
import { ownedHospitalId } from "@/lib/facility";

export const instant = false;

type Coords = { lat?: number; lng?: number };

function distanceKm(a: Coords, b: { lat: string; lng: string }): number | null {
  if (a.lat === undefined || a.lng === undefined) return null;
  const lat1 = a.lat;
  const lng1 = a.lng;
  const lat2 = Number(b.lat);
  const lng2 = Number(b.lng);
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return Math.round(2 * 6371 * Math.asin(Math.sqrt(h)) * 10) / 10;
}

/** GET /api/ambulance?lat=&lng=&type= - available ambulances near a point. */
export async function GET(req: Request) {
  return handleRoute(async () => {
    const url = new URL(req.url);
    const lat = url.searchParams.get("lat");
    const lng = url.searchParams.get("lng");
    const type = url.searchParams.get("type");
    const coords: Coords = {
      lat: lat ? Number(lat) : undefined,
      lng: lng ? Number(lng) : undefined,
    };

    const ambulances = await db.ambulance.findMany({
      where: {
        status: "AVAILABLE",
        hospital: { verifiedStatus: "APPROVED" },
        ...(type && ["BLS", "ALS", "ICU"].includes(type) ? { type } : {}),
      },
      select: {
        id: true,
        type: true,
        vehicleNumber: true,
        currentLat: true,
        currentLng: true,
        hospital: { select: { id: true, name: true, address: true, lat: true, lng: true } },
      },
      take: 50,
    });

    const items = ambulances
      .map((ambulance) => ({
        ...ambulance,
        distanceKm: distanceKm(coords, {
          lat: String(ambulance.hospital.lat),
          lng: String(ambulance.hospital.lng),
        }),
      }))
      .sort((a, b) => (a.distanceKm ?? 1e9) - (b.distanceKm ?? 1e9));

    return ok({ ambulances: items });
  });
}

/** POST /api/ambulance - hospital owner registers a vehicle. */
export async function POST(req: Request) {
  return handleRoute(async () => {
    const session = await requireSession();
    if (session.role !== "HOSPITAL" && session.role !== "ADMIN") {
      return fail("অনুমতি নেই", 403);
    }
    const data = parseOrThrow(ambulanceSchema, await req.json());

    const hospitalId =
      session.role === "HOSPITAL" ? await ownedHospitalId(session.userId) : data.hospitalId;
    if (!hospitalId) return fail("হাসপাতাল প্রোফাইল সংযুক্ত নয়", 403);
    if (session.role === "HOSPITAL" && hospitalId !== data.hospitalId) {
      return fail("অনুমতি নেই", 403);
    }

    const ambulance = await db.ambulance.create({
      data: {
        hospitalId,
        vehicleNumber: data.vehicleNumber,
        type: data.type,
        driverName: data.driverName ?? null,
        driverPhone: data.driverPhone ?? null,
        currentLat: data.currentLat === undefined ? null : String(data.currentLat),
        currentLng: data.currentLng === undefined ? null : String(data.currentLng),
      },
      select: { id: true, type: true, vehicleNumber: true, status: true },
    });
    return ok({ ambulance }, { status: 201 });
  });
}
