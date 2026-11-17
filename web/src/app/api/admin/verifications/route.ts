import { db } from "@/lib/db";
import { requireRole } from "@/lib/auth";
import { z } from "zod";
import { parseOrThrow } from "@/lib/validate";
import { handleRoute, ok, fail } from "@/lib/security";

export const runtime = "nodejs";
export const instant = false;

const decisionSchema = z.object({
  doctorId: z.string().min(1),
  decision: z.enum(["APPROVED", "REJECTED"]),
  note: z.string().max(300).optional(),
});

/** GET /api/admin/verifications — pending queue (§10 manual approve). */
export async function GET() {
  return handleRoute(async () => {
    await requireRole("ADMIN");

    // Metadata only — documents/medical content never shown to admin (§9).
    const queue = await db.doctor.findMany({
      where: { verifiedStatus: "PENDING" },
      select: {
        id: true, bmdcNo: true, specialty: true, degrees: true,
        fee: true, verifiedStatus: true,
        user: { select: { name: true, phone: true } },
        documents: { select: { id: true, type: true, status: true } },
      },
    });

    return ok({ queue });
  });
}

/** POST /api/admin/verifications — approve/reject decision. */
export async function POST(req: Request) {
  return handleRoute(async () => {
    const session = await requireRole("ADMIN");
    const data = parseOrThrow(decisionSchema, await req.json());

    const doctor = await db.doctor.findUnique({ where: { id: data.doctorId } });
    if (!doctor) return fail("ডাক্তার পাওয়া যায়নি", 404);

    await db.doctor.update({
      where: { id: doctor.id },
      data: { verifiedStatus: data.decision, verifiedAt: data.decision === "APPROVED" ? new Date() : null },
    });

    await db.auditLog.create({
      data: { actorId: session.userId, action: `doctor.${data.decision.toLowerCase()}`, target: doctor.id },
    });

    return ok({ ok: true });
  });
}
