import { db } from "@/lib/db";
import { requireSession, requireRole } from "@/lib/auth";
import { handleRoute, ok, fail } from "@/lib/security";
import { parseOrThrow, reportDecisionSchema, reportSchema } from "@/lib/validate";
import { rateLimit, limitKey } from "@/lib/rate-limit";

export const instant = false;

/** GET /api/reports?status= - admin moderation queue. */
export async function GET(req: Request) {
  return handleRoute(async () => {
    await requireRole("ADMIN");
    const status = new URL(req.url).searchParams.get("status");
    const reports = await db.report.findMany({
      where: status ? { status } : {},
      orderBy: { id: "desc" },
      take: 100,
      select: {
        id: true, targetType: true, targetId: true,
        reason: true, status: true,
        reporter: { select: { id: true, name: true } },
      },
    });
    return ok({ reports });
  });
}

/** POST /api/reports - report a doctor, pharmacy or user for review. */
export async function POST(req: Request) {
  return handleRoute(async () => {
    const session = await requireSession();
    const rl = rateLimit(`report:${limitKey(req, session.userId)}`, 5, 24 * 60 * 60 * 1000);
    if (!rl.ok) return fail("অনেক বেশি রিপোর্ট - একটু পরে", 429);

    const data = parseOrThrow(reportSchema, await req.json());
    if (data.targetType === "user" && data.targetId === session.userId) {
      return fail("নিজেকে রিপোর্ট করা যায় না", 400);
    }

    const exists =
      data.targetType === "doctor"
        ? await db.doctor.findFirst({
            where: { OR: [{ id: data.targetId }, { userId: data.targetId }] },
            select: { id: true },
          })
        : data.targetType === "pharmacy"
          ? await db.pharmacy.findUnique({ where: { id: data.targetId }, select: { id: true } })
          : await db.user.findUnique({ where: { id: data.targetId }, select: { id: true } });
    if (!exists) return fail("লক্ষ্য পাওয়া যায়নি", 404);

    const duplicate = await db.report.findFirst({
      where: {
        reporterId: session.userId,
        targetType: data.targetType,
        targetId: data.targetId,
        status: "open",
      },
      select: { id: true },
    });
    if (duplicate) return fail("এই বিষয়ে আপনার একটি রিপোর্ট আগেই খোলা আছে", 409);

    const report = await db.report.create({
      data: {
        reporterId: session.userId,
        targetType: data.targetType,
        targetId: data.targetId,
        reason: data.reason,
      },
      select: { id: true, status: true },
    });

    return ok({ report }, { status: 201 });
  });
}

/** PATCH /api/reports - admin closes a report. */
export async function PATCH(req: Request) {
  return handleRoute(async () => {
    await requireRole("ADMIN");
    const data = parseOrThrow(reportDecisionSchema, await req.json());
    const updated = await db.report.update({
      where: { id: data.reportId },
      data: { status: data.status },
      select: { id: true, status: true },
    });
    return ok({ report: updated });
  });
}
