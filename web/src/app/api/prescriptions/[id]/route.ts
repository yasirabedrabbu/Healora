import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { handleRoute, ok, fail } from "@/lib/security";

export const runtime = "nodejs";
export const instant = false;

/**
 * GET /api/prescriptions/[id] — patient sees own; doctor sees issued;
 * nobody else. Access is audit-logged (Handoff §9 access matrix).
 */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  return handleRoute(async () => {
    const session = await getSession();
    if (!session) return fail("লগইন প্রয়োজন", 401);

    const { id } = await params;
    const prescription = await db.prescription.findUnique({
      where: { id },
      include: {
        items: { include: { medicine: true } },
        doctor: { select: { name: true } },
      },
    });
    if (!prescription) return fail("প্রেসক্রিপশন পাওয়া যায়নি", 404);

    // Doctor profile (BMDC/specialty) lives on the Doctor row, keyed by userId.
    const doctorProfile = await db.doctor.findUnique({
      where: { userId: prescription.doctorId },
      select: { bmdcNo: true, specialty: true },
    });

    const allowed = prescription.patientId === session.userId || prescription.doctorId === session.userId;
    if (!allowed) return fail("অনুমতি নেই", 403);

    return ok({ prescription, doctorProfile });
  });
}
