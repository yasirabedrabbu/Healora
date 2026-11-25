import { db } from "@/lib/db";
import { handleRoute, ok, fail } from "@/lib/security";

export const instant = false;

/** GET /api/labs/[id] - one verified lab with its active test catalog. */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  return handleRoute(async () => {
    const { id } = await params;
    const lab = await db.lab.findFirst({
      where: { id, verifiedStatus: "APPROVED" },
      select: {
        id: true,
        name: true,
        address: true,
        lat: true,
        lng: true,
        tests: {
          where: { isActive: true },
          orderBy: { price: "asc" },
          select: {
            id: true,
            name: true,
            description: true,
            price: true,
            duration: true,
            requiresFasting: true,
          },
        },
      },
    });
    if (!lab) return fail("ল্যাব পাওয়া যায়নি", 404);
    return ok({ lab });
  });
}
