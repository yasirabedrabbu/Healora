import { db } from "@/lib/db";
import { requireSession } from "@/lib/auth";
import { handleRoute, ok, fail } from "@/lib/security";
import { ambulanceBookingSchema, parseOrThrow } from "@/lib/validate";
import { createNotification } from "@/lib/notifications";
import { rateLimit, limitKey } from "@/lib/rate-limit";
import { ownedHospitalId } from "@/lib/facility";

export const instant = false;

const INCLUDE = {
  ambulance: {
    select: {
      id: true, type: true, vehicleNumber: true,
      driverName: true, driverPhone: true,
      hospital: { select: { id: true, name: true, address: true } },
    },
  },
} as const;

/** GET /api/ambulance/bookings - role-scoped ride requests. */
export async function GET() {
  return handleRoute(async () => {
    const session = await requireSession();

    if (session.role === "HOSPITAL") {
      const hospitalId = await ownedHospitalId(session.userId);
      if (!hospitalId) return fail("হাসপাতাল প্রোফাইল সংযুক্ত নয়", 403);
      const bookings = await db.ambulanceBooking.findMany({
        where: { ambulance: { hospitalId } },
        include: { ...INCLUDE, patient: { select: { name: true, phone: true } } },
        orderBy: { createdAt: "desc" },
        take: 100,
      });
      return ok({ bookings });
    }

    if (session.role === "ADMIN") {
      const bookings = await db.ambulanceBooking.findMany({
        include: INCLUDE,
        orderBy: { createdAt: "desc" },
        take: 100,
      });
      return ok({ bookings });
    }

    const bookings = await db.ambulanceBooking.findMany({
      where: { patientId: session.userId },
      include: INCLUDE,
      orderBy: { createdAt: "desc" },
      take: 50,
    });
    return ok({ bookings });
  });
}

/** POST /api/ambulance/bookings - request a ride and assign an available vehicle. */
export async function POST(req: Request) {
  return handleRoute(async () => {
    const session = await requireSession();
    const rl = rateLimit(`ambulance:${limitKey(req, session.userId)}`, 5, 60 * 60 * 1000);
    if (!rl.ok) return fail("অনেক বেশি অনুরোধ - জরুরি হলে ৯৯৯ এ কল করুন", 429);

    const data = parseOrThrow(ambulanceBookingSchema, await req.json());

    const ambulance = await db.ambulance.findFirst({
      where: {
        status: "AVAILABLE",
        hospital: { verifiedStatus: "APPROVED" },
        ...(data.ambulanceId ? { id: data.ambulanceId } : {}),
      },
      select: { id: true, hospitalId: true, hospital: { select: { ownerId: true, name: true } } },
      orderBy: { updatedAt: "asc" },
    });
    if (!ambulance) return fail("এখন কোনো অ্যাম্বুলেন্স পাওয়া যাচ্ছে না - ৯৯৯ এ কল করুন", 409);

    const booking = await db.$transaction(async (tx) => {
      const created = await tx.ambulanceBooking.create({
        data: {
          patientId: session.userId,
          ambulanceId: ambulance.id,
          pickupLat: String(data.pickupLat),
          pickupLng: String(data.pickupLng),
          dropoffLat: String(data.dropoffLat),
          dropoffLng: String(data.dropoffLng),
          pickupAddress: data.pickupAddress,
          dropoffAddress: data.dropoffAddress,
          urgency: data.urgency,
          status: "ASSIGNED",
          assignedAt: new Date(),
        },
        include: INCLUDE,
      });
      await tx.ambulance.update({ where: { id: ambulance.id }, data: { status: "ON_DUTY" } });
      return created;
    });

    const critical = data.urgency === "critical";
    await createNotification({
      userId: session.userId,
      title: critical ? "অ্যাম্বুলেন্স পাঠানো হচ্ছে" : "অ্যাম্বুলেন্স বুকিং নিশ্চিত",
      body: critical
        ? "জরুরি অবস্থায় এখনই ৯৯৯ এ কল করুন। অ্যাম্বুলেন্স রওনা হচ্ছে।"
        : `${ambulance.hospital.name} থেকে অ্যাম্বুলেন্স রওনা হচ্ছে।`,
      type: "ambulance",
    });
    if (ambulance.hospital.ownerId) {
      await createNotification({
        userId: ambulance.hospital.ownerId,
        title: "নতুন অ্যাম্বুলেন্স রিকোয়েস্ট",
        body: "একটি অ্যাম্বুলেন্স বুকিং অ্যাসাইন হয়েছে। ড্যাশবোর্ডে দেখুন।",
        type: "ambulance",
      });
    }

    return ok({ booking, emergency: critical ? "999" : null }, { status: 201 });
  });
}
