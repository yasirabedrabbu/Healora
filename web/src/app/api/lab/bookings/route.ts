import { db } from "@/lib/db";
import { requireSession } from "@/lib/auth";
import { handleRoute, ok, fail } from "@/lib/security";
import { labBookingSchema, parseOrThrow } from "@/lib/validate";
import { createNotification } from "@/lib/notifications";
import { rateLimit, limitKey } from "@/lib/rate-limit";
import { ownedLabId } from "@/lib/facility";

export const instant = false;

const INCLUDE = {
  lab: { select: { id: true, name: true } },
  report: true,
} as const;

/** GET /api/lab/bookings - role-scoped booking list. */
export async function GET() {
  return handleRoute(async () => {
    const session = await requireSession();

    if (session.role === "LAB") {
      const labId = await ownedLabId(session.userId);
      if (!labId) return fail("ল্যাব প্রোফাইল সংযুক্ত নয়", 403);
      const bookings = await db.labBooking.findMany({
        where: { labId },
        include: { ...INCLUDE, patient: { select: { name: true, phone: true } } },
        orderBy: { slot: "desc" },
        take: 100,
      });
      return ok({ bookings });
    }

    if (session.role === "ADMIN") {
      const bookings = await db.labBooking.findMany({
        include: INCLUDE,
        orderBy: { slot: "desc" },
        take: 100,
      });
      return ok({ bookings });
    }

    const bookings = await db.labBooking.findMany({
      where: { patientId: session.userId },
      include: INCLUDE,
      orderBy: { slot: "desc" },
      take: 100,
    });
    return ok({ bookings });
  });
}

/** POST /api/lab/bookings - book tests; prices are computed server-side. */
export async function POST(req: Request) {
  return handleRoute(async () => {
    const session = await requireSession();
    const rl = rateLimit(`lab-book:${limitKey(req, session.userId)}`, 10, 60 * 60 * 1000);
    if (!rl.ok) return fail("অনেক বেশি বুকিং চেষ্টা", 429);

    const data = parseOrThrow(labBookingSchema, await req.json());
    const slot = new Date(data.slot);
    if (slot <= new Date()) return fail("অতীতের সময় বুক করা যায় না", 400);

    const lab = await db.lab.findFirst({
      where: { id: data.labId, verifiedStatus: "APPROVED" },
      select: { id: true, name: true },
    });
    if (!lab) return fail("ভেরিফায়েড ল্যাব নয়", 403);

    const tests = await db.labTest.findMany({
      where: { id: { in: data.testIds }, labId: lab.id, isActive: true },
      select: { id: true, price: true },
    });
    if (tests.length !== new Set(data.testIds).size) {
      return fail("কিছু টেস্ট পাওয়া যায়নি বা বন্ধ আছে", 400);
    }

    const totalPrice = tests.reduce((sum, test) => sum + test.price, 0);
    const booking = await db.labBooking.create({
      data: {
        patientId: session.userId,
        labId: lab.id,
        testIds: tests.map((test) => test.id),
        slot,
        homeCollection: data.homeCollection,
        address: data.address ?? null,
        lat: data.lat === undefined ? null : String(data.lat),
        lng: data.lng === undefined ? null : String(data.lng),
        totalPrice,
      },
      include: INCLUDE,
    });

    await createNotification({
      userId: session.userId,
      title: "ল্যাব বুকিং নিশ্চিত হয়েছে",
      body: `${lab.name} এ ${slot.toLocaleString("bn-BD")} সময়ে বুকিং হয়েছে। মোট ৳${totalPrice}।`,
      type: "lab",
    });

    return ok({ booking }, { status: 201 });
  });
}
