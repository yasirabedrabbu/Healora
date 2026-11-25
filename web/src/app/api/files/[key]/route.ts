import { db } from "@/lib/db";
import { requireSession } from "@/lib/auth";
import { handleRoute, secureHeaders, fail } from "@/lib/security";
import { readFile } from "@/lib/storage";
import { ownedLabId } from "@/lib/facility";

export const instant = false;

/** Stream one decrypted file if the caller is allowed to see it. */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ key: string }> }
) {
  return handleRoute(async () => {
    const session = await requireSession();
    const { key } = await params;
    const file = await readFile(key);
    const url = `/api/files/${key}`;

    let allowed = file.ownerId === session.userId;

    if (!allowed) {
      const record = await db.medicalRecord.findFirst({
        where: { fileUrl: url },
        select: {
          patientId: true,
          shares: {
            where: {
              granteeId: session.userId,
              revokedAt: null,
              expiresAt: { gt: new Date() },
            },
            select: { id: true },
            take: 1,
          },
        },
      });
      allowed = Boolean(record && (record.patientId === session.userId || record.shares.length > 0));
    }

    if (!allowed) {
      const report = await db.labReport.findFirst({
        where: { fileUrl: url },
        select: { booking: { select: { patientId: true, labId: true } } },
      });
      if (report) {
        allowed = report.booking.patientId === session.userId;
        if (!allowed && session.role === "LAB") {
          const labId = await ownedLabId(session.userId);
          allowed = Boolean(labId && labId === report.booking.labId);
        }
      }
    }

    if (!allowed) return fail("অনুমতি নেই", 403);

    return new Response(new Uint8Array(file.data), {
      headers: secureHeaders({
        "Content-Type": file.mime,
        "Content-Length": String(file.data.length),
        "Content-Disposition": "inline",
      }),
    });
  });
}
