import { db } from "@/lib/db";
import { requireSession } from "@/lib/auth";
import { handleRoute, ok, fail } from "@/lib/security";
import { parseOrThrow, reviewSchema } from "@/lib/validate";

export const instant = false;

/** GET /api/reviews?doctorId= - verified reviews for a doctor (public). */
export async function GET(req: Request) {
  return handleRoute(async () => {
    const doctorId = new URL(req.url).searchParams.get("doctorId");
    if (!doctorId) return fail("ডাক্তার আইডি দিন", 400);

    const reviews = await db.review.findMany({
      where: {
        verified: true,
        appointment: { doctor: { OR: [{ id: doctorId }, { userId: doctorId }] } },
      },
      orderBy: { id: "desc" },
      take: 50,
      select: { id: true, rating: true, text: true },
    });

    const count = reviews.length;
    const average = count === 0 ? 0 : reviews.reduce((sum, r) => sum + r.rating, 0) / count;
    return ok({ reviews, count, average: Math.round(average * 10) / 10 });
  });
}

/** POST /api/reviews - the patient rates a completed appointment once. */
export async function POST(req: Request) {
  return handleRoute(async () => {
    const session = await requireSession();
    const data = parseOrThrow(reviewSchema, await req.json());

    const appointment = await db.appointment.findUnique({
      where: { id: data.appointmentId },
      select: {
        patientId: true,
        status: true,
        doctorId: true,
        doctor: { select: { id: true, userId: true } },
        review: { select: { id: true } },
      },
    });
    if (!appointment) return fail("অ্যাপয়েন্টমেন্ট পাওয়া যায়নি", 404);
    if (appointment.patientId !== session.userId) return fail("অনুমতি নেই", 403);
    if (appointment.status !== "COMPLETED") return fail("সম্পন্ন ভিজিটের পর রিভিউ দেওয়া যায়", 409);
    if (appointment.review) return fail("এই ভিজিটের রিভিউ আগেই দেওয়া হয়েছে", 409);

    const review = await db.review.create({
      data: {
        appointmentId: data.appointmentId,
        rating: data.rating,
        text: data.text ?? null,
        verified: true,
      },
      select: { id: true, rating: true, text: true },
    });

    const aggregate = await db.review.aggregate({
      where: { verified: true, appointment: { doctorId: appointment.doctor.id } },
      _avg: { rating: true },
    });
    await db.doctor.update({
      where: { id: appointment.doctor.id },
      data: { rating: aggregate._avg.rating ?? 0 },
    });

    await db.notification.create({
      data: {
        userId: appointment.doctor.userId,
        title: "নতুন রিভিউ এসেছে",
        body: `${data.rating} স্টার রেটিং পাওয়া গেছে।`,
        type: "system",
      },
    });

    return ok({ review }, { status: 201 });
  });
}
