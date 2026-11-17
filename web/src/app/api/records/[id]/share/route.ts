import { db } from "@/lib/db";
import { requireSession } from "@/lib/auth";
import { z } from "zod";
import { parseOrThrow } from "@/lib/validate";
import { handleRoute, ok, fail } from "@/lib/security";

export const instant = false;

const shareSchema = z.object({
  granteeId: z.string().min(1),
  days: z.number().int().min(1).max(90).default(7),
});

/**
 * POST /api/records/[id]/share — time-limited, revocable grant (§9).
 * Only the record owner can share. Creation is logged.
 */
export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  return handleRoute(async () => {
    const session = await requireSession();
    const { id } = await params;
    const data = parseOrThrow(shareSchema, await req.json());

    const record = await db.medicalRecord.findUnique({ where: { id } });
    if (!record) return fail("রেকর্ড পাওয়া যায়নি", 404);
    if (record.patientId !== session.userId) return fail("শুধু রেকর্ডের মালিক শেয়ার করতে পারেন", 403);

    const share = await db.recordShare.create({
      data: {
        recordId: id,
        granteeId: data.granteeId,
        expiresAt: new Date(Date.now() + data.days * 86_400_000),
      },
    });

    await db.accessLog.create({
      data: { recordId: id, accessedBy: session.userId, action: "share" },
    });

    return ok({ ok: true, shareId: share.id, expiresAt: share.expiresAt }, { status: 201 });
  });
}
