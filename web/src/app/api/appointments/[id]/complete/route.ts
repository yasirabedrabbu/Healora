import { db } from "@/lib/db";
import { requireRole } from "@/lib/auth";
import { handleRoute, ok, fail } from "@/lib/security";

export const instant = false;

/**
 * POST /api/appointments/[id]/complete - doctor closes the visit.
 * Marks the consultation ended and releases the held payment (§11).
 */
export async function POST(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  return handleRoute(async () => {
    const session = await requireRole("DOCTOR");
    const { id } = await params;

    const appointment = await db.appointment.findUnique({
      where: { id },
      select: {
        patientId: true,
        status: true,
        doctor: { select: { userId: true } },
        consultation: { select: { id: true, startedAt: true } },
      },
    });
    if (!appointment) return fail("অ্যাপয়েন্টমেন্ট পাওয়া যায়নি", 404);
    if (appointment.doctor.userId !== session.userId) return fail("অনুমতি নেই", 403);
    if (appointment.status !== "BOOKED") return fail("এই অ্যাপয়েন্টমেন্ট সক্রিয় নয়", 409);
    if (!appointment.consultation) return fail("কনসালটেশন শুরু হয়নি", 409);

    const [updated] = await db.$transaction([
      db.appointment.update({
        where: { id },
        data: { status: "COMPLETED" },
        select: { id: true, status: true },
      }),
      db.consultation.update({
        where: { id: appointment.consultation.id },
        data: { endedAt: new Date() },
      }),
      db.payment.updateMany({
        where: { appointmentId: id, status: "HOLD" },
        data: { status: "RELEASED", releasedAt: new Date() },
      }),
    ]);

    await db.notification.create({
      data: {
        userId: appointment.patientId,
        title: "কনসালটেশন সম্পন্ন",
        body: "ভিজিট সম্পন্ন হয়েছে। প্রেসক্রিপশন ও রেকর্ড ড্যাশবোর্ডে দেখুন।",
        type: "appointment",
      },
    });

    return ok({ ok: true, status: updated.status });
  });
}
