import { db } from "@/lib/db";
import { requireSession } from "@/lib/auth";
import { handleRoute, ok, fail } from "@/lib/security";
import { ownedPharmacyId } from "@/lib/facility";

export const instant = false;

const INCLUDE = {
  prescription: {
    select: {
      id: true,
      validUntil: true,
      items: { select: { id: true, dose: true, duration: true, medicine: true } },
    },
  },
  pharmacy: { select: { id: true, name: true } },
} as const;

/** GET /api/refills - role-scoped refill queue. */
export async function GET() {
  return handleRoute(async () => {
    const session = await requireSession();

    if (session.role === "PHARMACY") {
      const pharmacyId = await ownedPharmacyId(session.userId);
      if (!pharmacyId) return fail("ফার্মেসি প্রোফাইল সংযুক্ত নয়", 403);
      const refills = await db.refillRequest.findMany({
        where: { pharmacyId },
        include: { ...INCLUDE, patient: { select: { name: true, phone: true } } },
        orderBy: { createdAt: "desc" },
        take: 100,
      });
      return ok({ refills });
    }

    if (session.role === "ADMIN") {
      const refills = await db.refillRequest.findMany({
        include: INCLUDE,
        orderBy: { createdAt: "desc" },
        take: 100,
      });
      return ok({ refills });
    }

    const refills = await db.refillRequest.findMany({
      where: { patientId: session.userId },
      include: INCLUDE,
      orderBy: { createdAt: "desc" },
      take: 50,
    });
    return ok({ refills });
  });
}
