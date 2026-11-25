import { db } from "@/lib/db";
import { requireSession } from "@/lib/auth";
import { handleRoute, ok, fail } from "@/lib/security";
import { pharmacyOrderStatusSchema, parseOrThrow } from "@/lib/validate";
import { createNotification } from "@/lib/notifications";
import { ownedPharmacyId } from "@/lib/facility";

export const instant = false;

/**
 * PATCH /api/pharmacy/orders/[id] - pharmacy advances the order.
 * Patients may only cancel while the order is still RECEIVED.
 */
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  return handleRoute(async () => {
    const session = await requireSession();
    const { id } = await params;
    const { status } = parseOrThrow(pharmacyOrderStatusSchema, await req.json());

    const order = await db.pharmacyOrder.findUnique({
      where: { id },
      select: { patientId: true, pharmacyId: true, status: true },
    });
    if (!order) return fail("অর্ডার পাওয়া যায়নি", 404);

    if (session.role === "PHARMACY") {
      const pharmacyId = await ownedPharmacyId(session.userId);
      if (!pharmacyId || pharmacyId !== order.pharmacyId) return fail("অনুমতি নেই", 403);
    } else if (session.role === "PATIENT") {
      if (order.patientId !== session.userId) return fail("অনুমতি নেই", 403);
      if (status !== "CANCELLED") return fail("অনুমতি নেই", 403);
      if (order.status !== "RECEIVED") return fail("প্রস্তুতি শুরু হলে বাতিল করা যায় না", 409);
    } else if (session.role !== "ADMIN") {
      return fail("অনুমতি নেই", 403);
    }

    if (order.status === "DISPENSED") return fail("ডিসপেন্স হওয়া অর্ডার বদলানো যায় না", 409);
    if (order.status === "CANCELLED") return fail("বাতিল অর্ডার বদলানো যায় না", 409);

    const updated = await db.pharmacyOrder.update({
      where: { id },
      data: { status },
      select: { id: true, status: true },
    });

    const copy: Record<string, string> = {
      VERIFIED: "ফার্মেসি আপনার প্রেসক্রিপশন যাচাই করেছে।",
      PREPARING: "আপনার ওষুধ প্রস্তুত করা হচ্ছে।",
      READY_FOR_PICKUP: "আপনার ওষুধ প্রস্তুত, সংগ্রহ করুন।",
      CANCELLED: "অর্ডারটি বাতিল হয়েছে।",
    };
    await createNotification({
      userId: order.patientId,
      title: "ফার্মেসি অর্ডার আপডেট",
      body: copy[status] ?? "অর্ডার স্ট্যাটাস আপডেট হয়েছে।",
      type: "pharmacy",
    });

    return ok({ order: updated });
  });
}
