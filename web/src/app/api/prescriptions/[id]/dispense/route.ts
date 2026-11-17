import { db } from "@/lib/db";
import { handleRoute, ok, fail } from "@/lib/security";

export const runtime = "nodejs";
export const instant = false;

/**
 * POST /api/prescriptions/[id]/dispense — pharmacy marks one-time use
 * (Handoff §10). Idempotent-guarded: once DISPENSED, further calls fail.
 * Pharmacy role per access matrix §9.
 */
export async function POST(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  return handleRoute(async () => {
    const { id } = await params;

    const prescription = await db.prescription.findUnique({ where: { id } });
    if (!prescription) return fail("প্রেসক্রিপশন পাওয়া যায়নি", 404);
    if (prescription.status === "DISPENSED") {
      return fail("এই প্রেসক্রিপশন আগেই ডিসপেন্স হয়েছে — পুনরায় ব্যবহার অসম্ভব", 409);
    }
    if (prescription.validUntil < new Date()) {
      return fail("মেয়াদ শেষ — QR অবৈধ", 410);
    }

    const updated = await db.prescription.update({
      where: { id },
      data: { status: "DISPENSED" },
    });

    return ok({ ok: true, status: updated.status });
  });
}
