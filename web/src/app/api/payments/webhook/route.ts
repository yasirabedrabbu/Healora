import { createHmac, timingSafeEqual } from "node:crypto";
import { db } from "@/lib/db";
import { z } from "zod";
import { parseOrThrow } from "@/lib/validate";
import { handleRoute, ok, fail } from "@/lib/security";

export const instant = false;

const webhookSchema = z.object({
  paymentId: z.string().min(1),
  event: z.enum(["succeeded", "failed", "refunded"]),
  gatewayRef: z.string().max(200).optional(),
});

/** Constant-time check of `x-healora-signature: sha256=<hex>`. */
function signatureValid(raw: string, header: string | null): boolean {
  const secret = process.env.PAYMENT_WEBHOOK_SECRET;
  if (!secret) return process.env.NODE_ENV !== "production";
  const expected = `sha256=${createHmac("sha256", secret).update(raw).digest("hex")}`;
  if (!header) return false;
  const a = Buffer.from(header);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

/**
 * POST /api/payments/webhook - gateway settlement callbacks.
 * Signed with `PAYMENT_WEBHOOK_SECRET` and idempotent: repeated or
 * out-of-order callbacks cannot release or refund a payment twice.
 * In production a missing secret fails closed (503).
 */
export async function POST(req: Request) {
  return handleRoute(async () => {
    const raw = await req.text();
    if (!signatureValid(raw, req.headers.get("x-healora-signature"))) {
      return fail("ওয়েবহুক স্বাক্ষর অবৈধ", 401);
    }

    const body = parseOrThrow(webhookSchema, JSON.parse(raw));

    const payment = await db.payment.findUnique({ where: { id: body.paymentId } });
    if (!payment) return fail("পেমেন্ট পাওয়া যায়নি", 404);

    if (body.event === "succeeded") {
      if (payment.status === "RELEASED") return ok({ ok: true, status: "RELEASED", duplicate: true });
      if (payment.status === "REFUNDED") return fail("রিফান্ড হওয়া পেমেন্ট রিলিজ করা যায় না", 409);

      const appointment = await db.appointment.findUnique({
        where: { id: payment.appointmentId },
        select: { patientId: true },
      });
      if (!appointment) return fail("অ্যাপয়েন্টমেন্ট পাওয়া যায়নি", 404);

      await db.$transaction([
        db.payment.update({
          where: { id: payment.id },
          data: { status: "RELEASED", releasedAt: new Date() },
        }),
        db.notification.create({
          data: {
            userId: appointment.patientId,
            title: "পেমেন্ট নিশ্চিত হয়েছে",
            body: "আপনার পেমেন্ট গেটওয়ে থেকে নিশ্চিত হয়েছে।",
            type: "system",
          },
        }),
      ]);
      return ok({ ok: true, status: "RELEASED" });
    }

    if (body.event === "refunded") {
      if (payment.status === "REFUNDED") return ok({ ok: true, status: "REFUNDED", duplicate: true });

      await db.$transaction([
        db.payment.update({
          where: { id: payment.id },
          data: { status: "REFUNDED", releasedAt: null },
        }),
        db.appointment.updateMany({
          where: { id: payment.appointmentId, status: "BOOKED" },
          data: { status: "NO_SHOW" },
        }),
      ]);
      return ok({ ok: true, status: "REFUNDED" });
    }

    // failed: keep the hold for retry; never release funds.
    return ok({ ok: true, status: payment.status });
  });
}
