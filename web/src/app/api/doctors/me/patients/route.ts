import { db } from "@/lib/db";
import { requireRole } from "@/lib/auth";
import { handleRoute, ok } from "@/lib/security";

export const instant = false;

/** GET /api/doctors/me/patients - distinct patients seen by this doctor. */
export async function GET() {
  return handleRoute(async () => {
    const session = await requireRole("DOCTOR");

    const appointments = await db.appointment.findMany({
      where: { doctor: { userId: session.userId } },
      orderBy: { slot: "desc" },
      take: 200,
      select: {
        slot: true,
        status: true,
        patient: { select: { id: true, name: true, bloodGroup: true, area: true } },
      },
    });

    const seen = new Map<string, {
      id: string;
      name: string | null;
      bloodGroup: string | null;
      area: string | null;
      visits: number;
      lastVisit: Date;
      lastStatus: string;
    }>();

    for (const { slot, status, patient } of appointments) {
      const entry = seen.get(patient.id);
      if (entry) {
        entry.visits += 1;
        continue;
      }
      seen.set(patient.id, {
        id: patient.id,
        name: patient.name,
        bloodGroup: patient.bloodGroup,
        area: patient.area,
        visits: 1,
        lastVisit: slot,
        lastStatus: status,
      });
    }

    return ok({ patients: [...seen.values()] });
  });
}
