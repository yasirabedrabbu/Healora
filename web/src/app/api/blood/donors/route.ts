import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { handleRoute, ok, fail } from "@/lib/security";

export const runtime = "nodejs";
export const instant = false;

/**
 * GET /api/blood/donors?group=&area= — Handoff §14 (§10 scam rules:
 * donor contact details stay hidden until the requester accepts).
 */
export async function GET(req: Request) {
  return handleRoute(async () => {
    const url = new URL(req.url);
    const group = url.searchParams.get("group");
    if (!group || !/^[ABO]{1,2}[+-]$/.test(group)) return fail("রক্তের গ্রুপ দিন", 400);

    const donors = await db.bloodDonor.findMany({
      where: { bloodGroup: group, verified: true },
      include: { user: { select: { name: true } } },
      take: 50,
    });

    // Contact deliberately omitted — revealed only after accept flow.
    return ok({
      donors: donors.map((d) => ({
        id: d.id,
        name: d.user.name,
        bloodGroup: d.bloodGroup,
        lastDonatedAt: d.lastDonatedAt,
        contactHidden: true,
      })),
    });
  });
}
