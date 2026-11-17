import { db } from "@/lib/db";
import { requireSession } from "@/lib/auth";
import { handleRoute, ok, fail } from "@/lib/security";

export const runtime = "nodejs";
export const instant = false;

/**
 * DELETE /api/records/[id]/share/[grant] — revoke (§9: revoke-able).
 * Owner-only; the revoke itself lands in the access log.
 */
export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string; grant: string }> }
) {
  return handleRoute(async () => {
    const session = await requireSession();
    const { id, grant } = await params;

    const record = await db.medicalRecord.findUnique({ where: { id } });
    if (!record) return fail("রেকর্ড পাওয়া যায়নি", 404);
    if (record.patientId !== session.userId) return fail("অনুমতি নেই", 403);

    const share = await db.recordShare.findFirst({ where: { id: grant, recordId: id } });
    if (!share) return fail("শেয়ার পাওয়া যায়নি", 404);

    await db.recordShare.update({ where: { id: share.id }, data: { revokedAt: new Date() } });
    await db.accessLog.create({
      data: { recordId: id, accessedBy: session.userId, action: "revoke" },
    });

    return ok({ ok: true });
  });
}
