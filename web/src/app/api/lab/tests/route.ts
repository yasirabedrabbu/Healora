import { db } from "@/lib/db";
import { getSession, requireSession } from "@/lib/auth";
import { handleRoute, ok, fail } from "@/lib/security";
import { labTestSchema, parseOrThrow } from "@/lib/validate";
import { ownedLabId } from "@/lib/facility";

export const instant = false;

/**
 * GET /api/lab/tests?labId= - active tests from verified labs.
 * Public so the booking page can render prices before sign-in.
 */
export async function GET(req: Request) {
  return handleRoute(async () => {
    const labId = new URL(req.url).searchParams.get("labId") ?? undefined;
    const session = await getSession();

    if (session?.role === "LAB") {
      const ownLabId = await ownedLabId(session.userId);
      if (!ownLabId) return fail("ল্যাব প্রোফাইল সংযুক্ত নয়", 403);
      const tests = await db.labTest.findMany({
        where: { labId: ownLabId },
        orderBy: { createdAt: "desc" },
        take: 200,
      });
      return ok({ tests });
    }

    const tests = await db.labTest.findMany({
      where: {
        isActive: true,
        lab: { verifiedStatus: "APPROVED" },
        ...(labId ? { labId } : {}),
      },
      include: { lab: { select: { id: true, name: true } } },
      orderBy: { price: "asc" },
      take: 100,
    });
    return ok({ tests });
  });
}

/** POST /api/lab/tests - lab owner (or admin) adds a test to its catalog. */
export async function POST(req: Request) {
  return handleRoute(async () => {
    const session = await requireSession();
    if (session.role !== "LAB" && session.role !== "ADMIN") {
      return fail("অনুমতি নেই", 403);
    }
    const data = parseOrThrow(labTestSchema, await req.json());

    const labId = session.role === "LAB" ? await ownedLabId(session.userId) : data.labId;
    if (!labId) return fail("ল্যাব প্রোফাইল সংযুক্ত নয়", 403);
    if (session.role === "LAB" && labId !== data.labId) return fail("অনুমতি নেই", 403);

    const lab = await db.lab.findUnique({ where: { id: labId }, select: { id: true } });
    if (!lab) return fail("ল্যাব পাওয়া যায়নি", 404);

    const test = await db.labTest.create({
      data: {
        labId,
        name: data.name,
        description: data.description ?? null,
        price: data.price,
        duration: data.duration,
        requiresFasting: data.requiresFasting,
      },
    });
    return ok({ test }, { status: 201 });
  });
}
