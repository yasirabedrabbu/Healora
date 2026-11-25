import { db } from "@/lib/db";
import { requireSession } from "@/lib/auth";
import { bloodDonorSchema, parseOrThrow } from "@/lib/validate";
import { handleRoute, ok, fail } from "@/lib/security";

export const instant = false;

/**
 * GET /api/blood/donors?group=&area= - Handoff §14 (§10 scam rules:
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

    // Contact deliberately omitted - revealed only after accept flow.
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

/**
 * POST /api/blood/donors - enroll or update the caller's donor card.
 * The account is already OTP-verified, so the donor is marked verified;
 * admin review can still suspend a donor later.
 */
export async function POST(req: Request) {
  return handleRoute(async () => {
    const session = await requireSession();
    const data = parseOrThrow(bloodDonorSchema, await req.json());

    const donor = await db.bloodDonor.upsert({
      where: { userId: session.userId },
      create: {
        userId: session.userId,
        bloodGroup: data.bloodGroup,
        areaLat: String(data.areaLat),
        areaLng: String(data.areaLng),
        lastDonatedAt: data.lastDonatedAt ? new Date(data.lastDonatedAt) : null,
        verified: true,
      },
      update: {
        bloodGroup: data.bloodGroup,
        areaLat: String(data.areaLat),
        areaLng: String(data.areaLng),
        ...(data.lastDonatedAt !== undefined
          ? { lastDonatedAt: data.lastDonatedAt ? new Date(data.lastDonatedAt) : null }
          : {}),
      },
      select: { id: true, bloodGroup: true, verified: true, lastDonatedAt: true },
    });

    await db.user.update({
      where: { id: session.userId },
      data: { bloodGroup: data.bloodGroup },
    });

    return ok({ donor }, { status: 201 });
  });
}
