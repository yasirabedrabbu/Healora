import { db } from "@/lib/db";
import { requireSession } from "@/lib/auth";
import { z } from "zod";
import { parseOrThrow } from "@/lib/validate";
import { handleRoute, ok, fail } from "@/lib/security";

export const runtime = "nodejs";
export const instant = false;

const initSchema = z.object({ appointmentId: z.string().min(1) });

/**
 * POST /api/payments/init — create a HOLD payment for an appointment
 * (Handoff §11: hold on platform, release after consultation).
 * Gateway call is stubbed: swap `gatewayReference` for the real
 * SSLCommerz/aamarPay session creation in production.
 */
export async function POST(req: Request) {
  return handleRoute(async () => {
    const session = await requireSession();
    const { appointmentId } = parseOrThrow(initSchema, await req.json());

    const appointment = await db.appointment.findUnique({
      where: { id: appointmentId },
      include: { doctor: true },
    });
    if (!appointment) return fail("অ্যাপয়েন্টমেন্ট পাওয়া যায়নি", 404);
    if (appointment.patientId !== session.userId) return fail("অনুমতি নেই", 403);

    const payment = await db.payment.upsert({
      where: { appointmentId },
      create: {
        appointmentId,
        amount: appointment.doctor.fee,
        gateway: "sandbox",
        status: "HOLD",
      },
      update: {},
    });

    await db.appointment.update({
      where: { id: appointmentId },
      data: { paymentId: payment.id },
    });

    return ok({ ok: true, paymentId: payment.id, amount: payment.amount, gateway: "sandbox" });
  });
}
