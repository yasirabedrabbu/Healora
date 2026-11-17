import { db } from "@/lib/db";
import { requireSession } from "@/lib/auth";
import { doctorRegisterSchema, parseOrThrow } from "@/lib/validate";
import { handleRoute, ok, fail } from "@/lib/security";
import { rateLimit, limitKey } from "@/lib/rate-limit";

export const instant = false;

/**
 * POST /api/doctors/register - BMDC/NID application (Handoff §10).
 * Creates a PENDING doctor; only admin approve (via verification queue)
 * flips verifiedStatus to APPROVED and the badge goes live.
 */
export async function POST(req: Request) {
  return handleRoute(async () => {
    const session = await requireSession();
    const rl = rateLimit(`doc-reg:${limitKey(req, session.userId)}`, 3, 60 * 60 * 1000);
    if (!rl.ok) return fail("অনেক বেশি আবেদন - একটু পরে", 429);

    const data = parseOrThrow(doctorRegisterSchema, await req.json());

    const existing = await db.doctor.findUnique({ where: { bmdcNo: data.bmdcNo } });
    if (existing) return fail("এই BMDC নম্বরে আবেদন আছে", 409);

    // Role upgrade: the applying user becomes a DOCTOR (pending review).
    await db.user.update({ where: { id: session.userId }, data: { role: "DOCTOR" } });

    const doctor = await db.doctor.create({
      data: {
        userId: session.userId,
        bmdcNo: data.bmdcNo,
        specialty: data.specialty,
        degrees: data.degrees,
        fee: data.fee,
        languages: data.languages,
        modes: data.modes,
        verifiedStatus: "PENDING",
      },
    });

    await db.auditLog.create({
      data: { actorId: session.userId, action: "doctor.register", target: doctor.id },
    });

    return ok({ ok: true, doctorId: doctor.id, status: "PENDING" });
  });
}
