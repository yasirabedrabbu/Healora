import { db } from "@/lib/db";
import { requireRole } from "@/lib/auth";
import { handleRoute, ok } from "@/lib/security";
import { parseOrThrow, scheduleSchema } from "@/lib/validate";

export const instant = false;

/** GET/PUT /api/doctors/me/schedule - authenticated doctor's weekly availability. */
export async function GET() {
  return handleRoute(async () => {
    const session = await requireRole("DOCTOR");
    const doctor = await db.doctor.findUniqueOrThrow({
      where: { userId: session.userId },
      select: { schedules: { orderBy: [{ weekday: "asc" }, { startAt: "asc" }] } },
    });
    return ok({ slots: doctor.schedules });
  });
}

/** Replace weekly availability atomically after validating every slot. */
export async function PUT(req: Request) {
  return handleRoute(async () => {
    const session = await requireRole("DOCTOR");
    const { slots } = parseOrThrow(scheduleSchema, await req.json());
    const doctor = await db.doctor.findUniqueOrThrow({
      where: { userId: session.userId },
      select: { id: true },
    });
    const saved = await db.$transaction(async (tx) => {
      await tx.schedule.deleteMany({ where: { doctorId: doctor.id } });
      if (slots.length) {
        await tx.schedule.createMany({
          data: slots.map((slot) => ({ ...slot, doctorId: doctor.id })),
        });
      }
      return tx.schedule.findMany({
        where: { doctorId: doctor.id },
        orderBy: [{ weekday: "asc" }, { startAt: "asc" }],
      });
    });
    return ok({ slots: saved });
  });
}
