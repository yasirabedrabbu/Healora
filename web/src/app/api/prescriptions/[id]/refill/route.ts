import { db } from "@/lib/db";
import { requireSession } from "@/lib/auth";
import { handleRoute, ok, fail } from "@/lib/security";
import { parseOrThrow, refillRequestSchema } from "@/lib/validate";
import { createNotification } from "@/lib/notifications";
import { rateLimit, limitKey } from "@/lib/rate-limit";

export const instant = false;

/**
 * POST /api/prescriptions/[id]/refill - request a repeat of a prescription.
 * Only the owning patient may ask, and only one request stays open at a time.
 */
export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  return handleRoute(async () => {
    const session = await requireSession();
    const { id } = await params;
    const rl = rateLimit(`refill:${limitKey(req, session.userId)}`, 10, 24 * 60 * 60 * 1000);
    if (!rl.ok) return fail("অনেক বেশি রিফিল অনুরোধ", 429);

    const data = parseOrThrow(refillRequestSchema, await req.json().catch(() => ({})));

    const prescription = await db.prescription.findUnique({
      where: { id },
      select: { patientId: true, status: true, validUntil: true },
    });
    if (!prescription) return fail("প্রেসক্রিপশন পাওয়া যায়নি", 404);
    if (prescription.patientId !== session.userId) return fail("অনুমতি নেই", 403);
    if (prescription.status === "EXPIRED") return fail("মেয়াদোত্তীর্ণ প্রেসক্রিপশনের রিফিল হয় না", 409);

    const open = await db.refillRequest.findFirst({
      where: { prescriptionId: id, status: { in: ["PENDING", "APPROVED"] } },
      select: { id: true },
    });
    if (open) return fail("এই প্রেসক্রিপশনের একটি রিফিল অনুরোধ আগেই চলছে", 409);

    let pharmacyOwnerId: string | null = null;
    if (data.pharmacyId) {
      const pharmacy = await db.pharmacy.findFirst({
        where: { id: data.pharmacyId, verifiedStatus: "APPROVED" },
        select: { ownerId: true },
      });
      if (!pharmacy) return fail("ভেরিফায়েড ফার্মেসি নয়", 403);
      pharmacyOwnerId = pharmacy.ownerId;
    }

    const refill = await db.refillRequest.create({
      data: {
        prescriptionId: id,
        patientId: session.userId,
        pharmacyId: data.pharmacyId ?? null,
        notes: data.notes ?? null,
      },
      select: { id: true, status: true, createdAt: true },
    });

    await createNotification({
      userId: session.userId,
      title: "রিফিল অনুরোধ পাঠানো হয়েছে",
      body: "ফার্মেসি অনুমোদন করলে জানানো হবে।",
      type: "refill",
    });
    if (pharmacyOwnerId) {
      await createNotification({
        userId: pharmacyOwnerId,
        title: "নতুন রিফিল অনুরোধ",
        body: "একটি প্রেসক্রিপশন রিফিল অনুরোধ এসেছে। ড্যাশবোর্ডে দেখুন।",
        type: "refill",
      });
    }

    return ok({ refill }, { status: 201 });
  });
}
