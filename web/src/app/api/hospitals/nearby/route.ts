import { db } from "@/lib/db";
import { handleRoute, ok, fail } from "@/lib/security";
import { rateLimit, limitKey } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const instant = false;

/**
 * GET /api/hospitals/nearby?lat=&lng=&radiusKm= — Handoff §14 (Phase 2).
 * Haversine distance (PostGIS swap-in ready). Coordinates validated;
 * radius capped at 50km.
 */
export async function GET(req: Request) {
  return handleRoute(async () => {
    const rl = rateLimit(`nearby:${limitKey(req)}`, 60, 60_000);
    if (!rl.ok) return fail("অনেক বেশি রিকোয়েস্ট", 429);

    const url = new URL(req.url);
    const lat = Number(url.searchParams.get("lat"));
    const lng = Number(url.searchParams.get("lng"));
    const radiusKm = Math.min(Number(url.searchParams.get("radiusKm") ?? "10"), 50);

    if (!Number.isFinite(lat) || !Number.isFinite(lng)) return fail("কোঅর্ডিনেট দিন", 400);

    const hospitals = await db.hospital.findMany({
      where: { verifiedStatus: "APPROVED" },
      include: { beds: true },
    });

    const toRad = (d: number) => (d * Math.PI) / 180;
    const dist = (aLat: number, aLng: number) => {
      const R = 6371;
      const dLat = toRad(aLat - lat);
      const dLng = toRad(aLng - lng);
      const h =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(toRad(lat)) * Math.cos(toRad(aLat)) * Math.sin(dLng / 2) ** 2;
      return 2 * R * Math.asin(Math.sqrt(h));
    };

    const results = hospitals
      .map((h) => ({ ...h, distanceKm: dist(Number(h.lat), Number(h.lng)) }))
      .filter((h) => h.distanceKm <= radiusKm)
      .sort((a, b) => a.distanceKm - b.distanceKm)
      .slice(0, 20)
      .map(({ lat: hLat, lng: hLng, ...rest }) => ({
        ...rest,
        lat: Number(hLat),
        lng: Number(hLng),
        distanceKm: Math.round(rest.distanceKm * 10) / 10,
      }));

    return ok({ hospitals: results });
  });
}
