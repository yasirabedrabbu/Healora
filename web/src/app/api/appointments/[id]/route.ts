import { db } from "@/lib/db";
import { requireSession } from "@/lib/auth";
import { handleRoute, fail, ok } from "@/lib/security";
import { appointmentCancelSchema, parseOrThrow } from "@/lib/validate";

export const instant = false;

/** PATCH /api/appointments/[id] - patient cancellation before a consultation starts. */
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  return handleRoute(async () => {
    const session = await requireSession();
    const { id } = await params;
    const { reason } = parseOrThrow(appointmentCancelSchema, await req.json());
    const appointment = await db.appointment.findUnique({
      where: { id },
      select: { patientId: true, doctor: { select: { userId: true } }, slot: true, status: true },
    });
    if (!appointment) return fail("অ্যাপয়েন্টমেন্ট পাওয়া যায়নি", 404);
    const participant = appointment.patientId === session.userId || appointment.doctor.userId === session.userId;
    if (!participant) return fail("অনুমতি নেই", 403);
    if (appointment.status !== "BOOKED" || appointment.slot <= new Date()) {
      return fail("এই অ্যাপয়েন্টমেন্ট বাতিল করা যাবে না", 409);
    }
    await db.$transaction([
      db.appointment.update({ where: { id }, data: { status: "CANCELLED" } }),
      db.payment.updateMany({
        where: { appointmentId: id, status: "HOLD" },
        data: { status: "REFUNDED" },
      }),
      db.notification.create({
        data: {
          userId: appointment.patientId,
          title: "অ্যাপয়েন্টমেন্ট বাতিল হয়েছে",
          body: reason || "আপনার বুকিং বাতিল করা হয়েছে।",
          type: "appointment",
        },
      }),
    ]);
    return ok({ ok: true });
  });
}
