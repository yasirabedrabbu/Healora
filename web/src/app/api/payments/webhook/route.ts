import { db } from "@/lib/db";
import { z } from "zod";
import { parseOrThrow } from "@/lib/validate";
import { handleRoute, ok, fail } from "@/lib/security";

export const instant = false;

const webhookSchema = z.object({
  paymentId: z.string().min(1),
  event: z.enum(["succeeded", "failed", "refunded"]),
  gatewayRef: z.string().optional(),
});

/**
 * POST /api/payments/webhook — gateway settlement callbacks.
 * Unauthenticated but signature-verified in production; here the payload
 * is validated and the state machine (HOLD → RELEASED/REFUNDED) runs.
 * No-show auto-refund lives in the scheduler (Celery/ARQ in prod).
 */
export async function POST(req: Request) {
  return handleRoute(async () => {
    const body = parseOrThrow(webhookSchema, await req.json());

    const payment = await db.payment.findUnique({ where: { id: body.paymentId } });
    if (!payment) return fail("পেমেন্ট পাওয়া যায়নি", 404);

    const status = body.event === "succeeded" ? "RELEASED" : body.event === "refunded" ? "REFUNDED" : "HOLD";
    await db.payment.update({
      where: { id: payment.id },
      data: { status, releasedAt: body.event === "succeeded" ? new Date() : null },
    });

    if (body.event === "refunded") {
      await db.appointment.update({
        where: { id: payment.appointmentId },
        data: { status: "NO_SHOW" },
      });
    }

    return ok({ ok: true, status });
  });
}
