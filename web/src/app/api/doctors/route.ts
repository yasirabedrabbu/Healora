import { db } from "@/lib/db";
import { handleRoute, ok, fail } from "@/lib/security";
import { rateLimit, limitKey } from "@/lib/rate-limit";

export const instant = false;

/**
 * GET /api/doctors?specialty=&area=&feeMax=&mode= - Handoff §14 search.
 * Only APPROVED doctors are ever returned (Handoff §10: verified badge
 * only after manual approve).
 */
export async function GET(req: Request) {
  return handleRoute(async () => {
    const rl = rateLimit(`doctors:${limitKey(req)}`, 60, 60_000);
    if (!rl.ok) return fail("অনেক বেশি রিকোয়েস্ট", 429);

    const url = new URL(req.url);
    const specialty = url.searchParams.get("specialty") ?? undefined;
    const feeMax = url.searchParams.get("feeMax");
    const mode = url.searchParams.get("mode") ?? undefined;
    const q = url.searchParams.get("q") ?? undefined;

    const doctors = await db.doctor.findMany({
      where: {
        verifiedStatus: "APPROVED",
        ...(specialty ? { specialty: { contains: specialty, mode: "insensitive" } } : {}),
        ...(feeMax ? { fee: { lte: Number(feeMax) } } : {}),
        ...(mode ? { modes: { has: mode } } : {}),
        ...(q
          ? {
              OR: [
                { specialty: { contains: q, mode: "insensitive" } },
                { user: { name: { contains: q, mode: "insensitive" } } },
              ],
            }
          : {}),
      },
      take: 24,
      orderBy: { rating: "desc" },
      select: {
        id: true, specialty: true, degrees: true, fee: true,
        languages: true, modes: true, rating: true, nextSlot: true,
        verifiedStatus: true,
        user: { select: { name: true } },
      },
    });

    return ok({ doctors: doctors.map((d) => ({ ...d, name: d.user.name })) });
  });
}
