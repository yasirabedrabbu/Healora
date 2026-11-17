import { db } from "@/lib/db";
import { requireSession } from "@/lib/auth";
import { handleRoute, ok, fail } from "@/lib/security";

export const instant = false;

/**
 * GET /api/records/[id]/access-log — full view history (§5, §9).
 * Owner-only: the transparency layer that powers the trust promise.
 */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  return handleRoute(async () => {
    const session = await requireSession();
    const { id } = await params;

    const record = await db.medicalRecord.findUnique({ where: { id } });
    if (!record) return fail("রেকর্ড পাওয়া যায়নি", 404);
    if (record.patientId !== session.userId) return fail("অনুমতি নেই", 403);

    const logs = await db.accessLog.findMany({
      where: { recordId: id },
      orderBy: { accessedAt: "desc" },
      take: 100,
    });

    return ok({ logs });
  });
}
