import { createHmac } from "node:crypto";
import { db } from "@/lib/db";
import { handleRoute, ok, fail } from "@/lib/security";

export const runtime = "nodejs";
export const instant = false;

const hashSecret = process.env.AUTH_SECRET ?? "dev-only-secret-change-me";

/**
 * GET /api/verify/[token] — public QR verification (Handoff §14).
 * Shows doctor, reg no., date, medicine list + validity; re-verifies the
 * HMAC so tampering with the QR payload is detectable.
 */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ token: string }> }
) {
  return handleRoute(async () => {
    const { token } = await params;

    const prescription = await db.prescription.findUnique({
      where: { qrToken: token },
      include: { items: { include: { medicine: true } } },
    });
    if (!prescription) return fail("অবৈধ QR — পাওয়া যায়নি", 404);

    // Doctor identity: Prescription.doctor is a User; the verified profile
    // (BMDC, specialty) lives on the Doctor row keyed by userId.
    const doctorProfile = await db.doctor.findUnique({
      where: { userId: prescription.doctorId },
      select: { bmdcNo: true, specialty: true, verifiedStatus: true, user: { select: { name: true } } },
    });
    if (!doctorProfile) return fail("ডাক্তার পাওয়া যায়নি", 404);

    // Re-derive the hash to confirm integrity.
    const payload = JSON.stringify({
      qrToken: prescription.qrToken,
      patient: prescription.patientId,
      items: prescription.items.map((i) => ({
        medicineId: i.medicineId,
        dose: i.dose,
        duration: i.duration,
      })),
    });
    const expected = createHmac("sha256", hashSecret).update(payload).digest("hex");
    if (expected !== prescription.hash) return fail("হ্যাশ মিলছে না — জালিয়াতি সন্দেহ", 409);

    const expired = prescription.validUntil < new Date();
    return ok({
      ok: true,
      doctor: { name: prescription.doctor.user.name, bmdcNo: prescription.doctor.bmdcNo, specialty: prescription.doctor.specialty },
      status: prescription.status,
      expired,
      validUntil: prescription.validUntil,
      items: prescription.items.map((i) => ({
        medicine: i.medicine.brandName,
        dose: i.dose,
        duration: i.duration,
      })),
    });
  });
}
