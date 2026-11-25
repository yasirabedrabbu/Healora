import { db } from "@/lib/db";
import { requireSession } from "@/lib/auth";
import { handleRoute, ok, fail } from "@/lib/security";
import { pharmacyOrderSchema, parseOrThrow } from "@/lib/validate";
import { createNotification } from "@/lib/notifications";
import { ownedPharmacyId } from "@/lib/facility";

export const instant = false;

const INCLUDE = {
  pharmacy: { select: { id: true, name: true } },
  prescription: {
    include: { items: { include: { medicine: true } } },
  },
} as const;

/** GET /api/pharmacy/orders - role-scoped order queue. */
export async function GET() {
  return handleRoute(async () => {
    const session = await requireSession();

    if (session.role === "PHARMACY") {
      const pharmacyId = await ownedPharmacyId(session.userId);
      if (!pharmacyId) return fail("ফার্মেসি প্রোফাইল সংযুক্ত নয়", 403);
      const orders = await db.pharmacyOrder.findMany({
        where: { pharmacyId },
        include: { ...INCLUDE, patient: { select: { name: true, phone: true } } },
        orderBy: { createdAt: "desc" },
        take: 100,
      });
      return ok({ orders });
    }

    if (session.role === "ADMIN") {
      const orders = await db.pharmacyOrder.findMany({
        include: INCLUDE,
        orderBy: { createdAt: "desc" },
        take: 100,
      });
      return ok({ orders });
    }

    const orders = await db.pharmacyOrder.findMany({
      where: { patientId: session.userId },
      include: INCLUDE,
      orderBy: { createdAt: "desc" },
      take: 100,
    });
    return ok({ orders });
  });
}

/** POST /api/pharmacy/orders - patient sends an active prescription to a pharmacy. */
export async function POST(req: Request) {
  return handleRoute(async () => {
    const session = await requireSession();
    const data = parseOrThrow(pharmacyOrderSchema, await req.json());

    const prescription = await db.prescription.findUnique({
      where: { id: data.prescriptionId },
      select: { patientId: true, status: true, validUntil: true, pharmacyOrder: { select: { id: true } } },
    });
    if (!prescription) return fail("প্রেসক্রিপশন পাওয়া যায়নি", 404);
    if (prescription.patientId !== session.userId) return fail("অনুমতি নেই", 403);
    if (prescription.status !== "ACTIVE") return fail("শুধু সক্রিয় প্রেসক্রিপশন পাঠানো যায়", 409);
    if (prescription.validUntil < new Date()) return fail("প্রেসক্রিপশনের মেয়াদ শেষ", 410);
    if (prescription.pharmacyOrder) return fail("এই প্রেসক্রিপশন আগেই পাঠানো হয়েছে", 409);

    const pharmacy = await db.pharmacy.findFirst({
      where: { id: data.pharmacyId, verifiedStatus: "APPROVED" },
      select: { id: true, name: true, ownerId: true },
    });
    if (!pharmacy) return fail("ভেরিফায়েড ফার্মেসি নয়", 403);

    const order = await db.pharmacyOrder.create({
      data: {
        prescriptionId: data.prescriptionId,
        pharmacyId: pharmacy.id,
        patientId: session.userId,
        notes: data.notes ?? null,
      },
      include: INCLUDE,
    });

    await createNotification({
      userId: session.userId,
      title: "ফার্মেসি অর্ডার পাঠানো হয়েছে",
      body: `${pharmacy.name} আপনার প্রেসক্রিপশন পেয়েছে। প্রস্তুত হলে জানানো হবে।`,
      type: "pharmacy",
    });
    if (pharmacy.ownerId) {
      await createNotification({
        userId: pharmacy.ownerId,
        title: "নতুন ফার্মেসি অর্ডার",
        body: "একটি নতুন প্রেসক্রিপশন অর্ডার এসেছে। ড্যাশবোর্ডে দেখুন।",
        type: "pharmacy",
      });
    }

    return ok({ order }, { status: 201 });
  });
}
