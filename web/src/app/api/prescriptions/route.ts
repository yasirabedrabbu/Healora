import { createHmac, randomBytes } from "node:crypto";
import { db } from "@/lib/db";
import { requireRole, requireSession } from "@/lib/auth";
import { prescriptionSchema, parseOrThrow } from "@/lib/validate";
import { handleRoute, ok, fail } from "@/lib/security";

export const instant = false;

const hashSecret = process.env.AUTH_SECRET ?? "dev-only-secret-change-me";

/** GET /api/prescriptions - caller's prescriptions (role-scoped). */
export async function GET() {
  return handleRoute(async () => {
    const session = await requireSession();
    if (session.role === "ADMIN") return fail("মেডিকেল কনটেন্টে অ্যাডমিনের অ্যাক্সেস নেই", 403);

    const where =
      session.role === "DOCTOR"
        ? { doctorId: session.userId }
        : { patientId: session.userId };

    const prescriptions = await db.prescription.findMany({
      where,
      include: {
        items: { include: { medicine: true } },
        doctor: { select: { name: true, doctor: { select: { specialty: true } } } },
        patient: { select: { name: true } },
      },
      orderBy: { createdAt: "desc" },
      take: 100,
    });
    return ok({ prescriptions });
  });
}

/**
 * POST /api/prescriptions - doctors only (Handoff §9/§10).
 * Issues a hash-signed prescription with a unique QR token + validity
 * date. One-time use enforced at /dispense.
 */
export async function POST(req: Request) {
  return handleRoute(async () => {
    const session = await requireRole("DOCTOR");
    const data = parseOrThrow(prescriptionSchema, await req.json());

    const doctor = await db.doctor.findFirst({
      where: { userId: session.userId, verifiedStatus: "APPROVED" },
    });
    if (!doctor) return fail("ভেরিফায়েড ডাক্তাররাই প্রেসক্রিপশন ইস্যু করতে পারেন", 403);

    const qrToken = randomBytes(16).toString("hex");
    const payload = JSON.stringify({ qrToken, patient: data.patientId, items: data.items });
    const hash = createHmac("sha256", hashSecret).update(payload).digest("hex");

    const prescription = await db.prescription.create({
      data: {
        doctorId: session.userId,
        patientId: data.patientId,
        hash,
        qrToken,
        validUntil: new Date(Date.now() + data.validDays * 86_400_000),
        items: {
          create: data.items.map((i) => ({
            medicineId: i.medicineId,
            dose: i.dose,
            duration: i.duration,
          })),
        },
      },
      include: { items: true },
    });

    return ok({ ok: true, id: prescription.id, qrToken, hash, validUntil: prescription.validUntil }, { status: 201 });
  });
}
