import { db } from "@/lib/db";
import { requireSession } from "@/lib/auth";
import { z } from "zod";
import { parseOrThrow } from "@/lib/validate";
import { handleRoute, ok, fail } from "@/lib/security";
import { createGatewaySession } from "@/lib/payments";

export const instant = false;

const initSchema = z.object({ appointmentId: z.string().min(1) });

/**
 * POST /api/payments/init - create a HOLD payment for an appointment
 * (Handoff section 11: hold on platform, release after consultation).
 * With SSLCommerz credentials the response carries a hosted checkout URL;
 * settlement only happens through the signed webhook.
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
    if (appointment.status !== "BOOKED") return fail("এই অ্যাপয়েন্টমেন্ট সক্রিয় নয়", 409);

    const existing = await db.payment.findUnique({ where: { appointmentId } });
    if (existing?.status === "RELEASED" || existing?.status === "REFUNDED") {
      return fail("এই অ্যাপয়েন্টমেন্টের পেমেন্ট সম্পন্ন হয়েছে", 409);
    }

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

    const gateway = await createGatewaySession({
      paymentId: payment.id,
      amount: payment.amount,
      appointmentId,
    });

    await db.payment.update({
      where: { id: payment.id },
      data: { gateway: gateway.gateway, gatewayRef: gateway.gatewayRef },
    });

    return ok({
      ok: true,
      paymentId: payment.id,
      amount: payment.amount,
      status: "HOLD",
      gateway: gateway.gateway,
      redirectUrl: gateway.redirectUrl,
    });
  });
}
