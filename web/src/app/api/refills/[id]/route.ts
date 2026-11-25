import { db } from "@/lib/db";
import { requireSession } from "@/lib/auth";
import { handleRoute, ok, fail } from "@/lib/security";
import { parseOrThrow, refillStatusSchema } from "@/lib/validate";
import { createNotification } from "@/lib/notifications";
import { ownedPharmacyId } from "@/lib/facility";

export const instant = false;

/** PATCH /api/refills/[id] - pharmacy reviews a refill request. */
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  return handleRoute(async () => {
    const session = await requireSession();
    const { id } = await params;
    const { status } = parseOrThrow(refillStatusSchema, await req.json());

    const refill = await db.refillRequest.findUnique({
      where: { id },
      select: { patientId: true, pharmacyId: true, status: true },
    });
    if (!refill) return fail("রিফিল অনুরোধ পাওয়া যায়নি", 404);

    if (session.role === "PHARMACY") {
      const pharmacyId = await ownedPharmacyId(session.userId);
      if (!pharmacyId || pharmacyId !== refill.pharmacyId) return fail("অনুমতি নেই", 403);
    } else if (session.role !== "ADMIN") {
      return fail("অনুমতি নেই", 403);
    }

    if (refill.status === "REJECTED" || refill.status === "FULFILLED") {
      return fail("শেষ হওয়া অনুরোধ বদলানো যায় না", 409);
    }
    if (status === "FULFILLED" && refill.status !== "APPROVED") {
      return fail("আগে অনুমোদন করতে হবে", 409);
    }

    const updated = await db.refillRequest.update({
      where: { id },
      data: { status },
      select: { id: true, status: true, updatedAt: true },
    });

    const copy: Record<string, string> = {
      APPROVED: "আপনার রিফিল অনুরোধ অনুমোদিত হয়েছে।",
      REJECTED: "আপনার রিফিল অনুরোধ গ্রহণ করা হয়নি। প্রয়োজনে ডাক্তারের সাথে কথা বলুন।",
      FULFILLED: "আপনার রিফিল ওষুধ প্রস্তুত হয়েছে।",
    };
    await createNotification({
      userId: refill.patientId,
      title: "রিফিল আপডেট",
      body: copy[status] ?? "রিফিল স্ট্যাটাস আপডেট হয়েছে।",
      type: "refill",
    });

    return ok({ refill: updated });
  });
}
