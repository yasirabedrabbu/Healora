import { db } from "@/lib/db";
import { requireSession } from "@/lib/auth";
import { handleRoute, ok, fail } from "@/lib/security";

export const instant = false;

/**
 * POST /api/appointments/[id]/consultation - join (or open) the
 * consultation room for a booked appointment. Idempotent per appointment.
 */
export async function POST(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  return handleRoute(async () => {
    const session = await requireSession();
    const { id } = await params;

    const appointment = await db.appointment.findUnique({
      where: { id },
      select: {
        patientId: true,
        slot: true,
        status: true,
        mode: true,
        doctor: { select: { userId: true, user: { select: { name: true } } } },
        consultation: { select: { id: true, startedAt: true, endedAt: true } },
      },
    });
    if (!appointment) return fail("অ্যাপয়েন্টমেন্ট পাওয়া যায়নি", 404);

    const isPatient = appointment.patientId === session.userId;
    const isDoctor = appointment.doctor.userId === session.userId;
    if (!isPatient && !isDoctor) return fail("অনুমতি নেই", 403);
    if (appointment.status !== "BOOKED") return fail("এই অ্যাপয়েন্টমেন্ট সক্রিয় নয়", 409);

    if (appointment.consultation) {
      return ok({ consultation: appointment.consultation, mode: appointment.mode });
    }

    const consultation = await db.consultation.create({
      data: { appointmentId: id, startedAt: new Date() },
      select: { id: true, startedAt: true, endedAt: true },
    });

    await db.notification.create({
      data: {
        userId: isDoctor ? appointment.patientId : appointment.doctor.userId,
        title: "কনসালটেশন শুরু হয়েছে",
        body: `${isDoctor ? appointment.doctor.user.name : "রোগী"} কনসালটেশন রুমে যোগ দিয়েছেন।`,
        type: "appointment",
      },
    });

    return ok({ consultation, mode: appointment.mode }, { status: 201 });
  });
}
