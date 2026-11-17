import { db } from "@/lib/db";
import { requireSession } from "@/lib/auth";
import { appointmentSchema, parseOrThrow } from "@/lib/validate";
import { handleRoute, ok, fail } from "@/lib/security";
import { rateLimit, limitKey } from "@/lib/rate-limit";

export const instant = false;

/** GET /api/appointments — the caller's own list (role-aware). */
export async function GET() {
  return handleRoute(async () => {
    const session = await requireSession();
    const where =
      session.role === "DOCTOR"
        ? { doctor: { userId: session.userId } }
        : { patientId: session.userId };

    const items = await db.appointment.findMany({
      where,
      include: {
        doctor: { select: { specialty: true, user: { select: { name: true } } } },
      },
      orderBy: { slot: "desc" },
      take: 50,
    });
    return ok({ appointments: items });
  });
}

/** POST /api/appointments — book a verified doctor slot. */
export async function POST(req: Request) {
  return handleRoute(async () => {
    const session = await requireSession();
    const rl = rateLimit(`book:${limitKey(req, session.userId)}`, 20, 60 * 60 * 1000);
    if (!rl.ok) return fail("অনেক বেশি বুকিং চেষ্টা", 429);

    const data = parseOrThrow(appointmentSchema, await req.json());
    const doctor = await db.doctor.findFirst({
      where: { id: data.doctorId, verifiedStatus: "APPROVED" },
    });
    if (!doctor) return fail("ভেরিফায়েড ডাক্তার নয়", 403);

    const appointment = await db.appointment.create({
      data: {
        patientId: session.userId,
        doctorId: doctor.id,
        slot: new Date(data.slot),
        mode: data.mode,
        status: "BOOKED",
      },
    });

    return ok({ ok: true, appointmentId: appointment.id }, { status: 201 });
  });
}
