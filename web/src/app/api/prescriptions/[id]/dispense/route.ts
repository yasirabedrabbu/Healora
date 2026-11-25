import { db } from "@/lib/db";
import { requireSession } from "@/lib/auth";
import { handleRoute, ok, fail } from "@/lib/security";
import { createNotification } from "@/lib/notifications";
import { ownedPharmacyId } from "@/lib/facility";

export const instant = false;

/**
 * POST /api/prescriptions/[id]/dispense - pharmacy marks one-time use
 * (Handoff section 10). Idempotent-guarded: once DISPENSED, further calls
 * fail. Pharmacy role per access matrix section 9.
 */
export async function POST(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  return handleRoute(async () => {
    const session = await requireSession();
    if (session.role !== "PHARMACY" && session.role !== "ADMIN") {
      return fail("অনুমতি নেই", 403);
    }
    if (session.role === "PHARMACY") {
      const pharmacyId = await ownedPharmacyId(session.userId);
      if (!pharmacyId) return fail("ফার্মেসি প্রোফাইল সংযুক্ত নয়", 403);
    }

    const { id } = await params;
    const prescription = await db.prescription.findUnique({
      where: { id },
      select: { patientId: true, status: true, validUntil: true },
    });
    if (!prescription) return fail("প্রেসক্রিপশন পাওয়া যায়নি", 404);
    if (prescription.status === "DISPENSED") {
      return fail("এই প্রেসক্রিপশন আগেই ডিসপেন্স হয়েছে - পুনরায় ব্যবহার অসম্ভব", 409);
    }
    if (prescription.validUntil < new Date()) {
      return fail("মেয়াদ শেষ - QR অবৈধ", 410);
    }

    const updated = await db.prescription.update({
      where: { id },
      data: { status: "DISPENSED" },
    });

    await createNotification({
      userId: prescription.patientId,
      title: "প্রেসক্রিপশন ডিসপেন্স হয়েছে",
      body: "ফার্মেসি আপনার প্রেসক্রিপশন অনুযায়ী ওষুধ দিয়েছে।",
      type: "pharmacy",
    });

    return ok({ ok: true, status: updated.status });
  });
}
