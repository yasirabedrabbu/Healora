import { db } from "@/lib/db";
import { handleRoute, ok, fail } from "@/lib/security";

export const instant = false;

/** GET /api/doctors/[id] — public verified profile (Handoff §14). */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  return handleRoute(async () => {
    const { id } = await params;
    const doctor = await db.doctor.findFirst({
      where: { OR: [{ id }, { bmdcNo: id }], verifiedStatus: "APPROVED" },
      select: {
        id: true, bmdcNo: true, specialty: true, degrees: true,
        fee: true, languages: true, modes: true, rating: true,
        nextSlot: true, verifiedStatus: true, verifiedAt: true,
        user: { select: { name: true } },
      },
    });
    if (!doctor) return fail("ডাক্তার পাওয়া যায়নি", 404);
    return ok({ doctor: { ...doctor, name: doctor.user.name } });
  });
}
