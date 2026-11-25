import { db } from "@/lib/db";
import { requireSession } from "@/lib/auth";
import { handleRoute, ok, fail } from "@/lib/security";
import { pharmacyDispenseSchema, parseOrThrow } from "@/lib/validate";
import { createNotification } from "@/lib/notifications";
import { ownedPharmacyId } from "@/lib/facility";

export const instant = false;

/**
 * POST /api/pharmacy/orders/[id]/dispense - record what was handed over.
 * Every line must belong to the linked prescription; the prescription is
 * marked DISPENSED so it can never be reused.
 */
export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  return handleRoute(async () => {
    const session = await requireSession();
    if (session.role !== "PHARMACY" && session.role !== "ADMIN") {
      return fail("অনুমতি নেই", 403);
    }
    const { id } = await params;
    const data = parseOrThrow(pharmacyDispenseSchema, await req.json());

    const order = await db.pharmacyOrder.findUnique({
      where: { id },
      select: {
        patientId: true,
        pharmacyId: true,
        status: true,
        prescriptionId: true,
        prescription: { select: { items: { select: { id: true } } } },
      },
    });
    if (!order) return fail("অর্ডার পাওয়া যায়নি", 404);
    if (order.status === "DISPENSED") return fail("আগেই ডিসপেন্স হয়েছে", 409);
    if (order.status === "CANCELLED") return fail("বাতিল অর্ডার ডিসপেন্স করা যায় না", 409);

    if (session.role === "PHARMACY") {
      const pharmacyId = await ownedPharmacyId(session.userId);
      if (!pharmacyId || pharmacyId !== order.pharmacyId) return fail("অনুমতি নেই", 403);
    }

    const allowed = new Set(order.prescription.items.map((item) => item.id));
    const seen = new Set<string>();
    for (const line of data.items) {
      if (!allowed.has(line.itemId)) return fail("প্রেসক্রিপশনে নেই এমন আইটেম", 400);
      if (seen.has(line.itemId)) return fail("একই আইটেম দুইবার দেওয়া যায় না", 400);
      seen.add(line.itemId);
    }

    const logs = await db.$transaction(async (tx) => {
      const created = await tx.pharmacyDispenseLog.createManyAndReturn({
        data: data.items.map((line) => ({
          orderId: id,
          itemId: line.itemId,
          quantity: line.quantity,
          dispensedBy: session.userId,
        })),
        select: { id: true, itemId: true, quantity: true, dispensedAt: true },
      });
      await tx.pharmacyOrder.update({ where: { id }, data: { status: "DISPENSED" } });
      await tx.prescription.update({
        where: { id: order.prescriptionId },
        data: { status: "DISPENSED" },
      });
      return created;
    });

    await createNotification({
      userId: order.patientId,
      title: "ওষুধ ডিসপেন্স হয়েছে",
      body: "ফার্মেসি আপনার প্রেসক্রিপশন অনুযায়ী ওষুধ ডিসপেন্স করেছে।",
      type: "pharmacy",
    });

    return ok({ ok: true, dispensed: logs }, { status: 201 });
  });
}
