import { db } from "@/lib/db";
import { requireRole } from "@/lib/auth";
import { handleRoute, ok } from "@/lib/security";

export const instant = false;

/** GET /api/doctors/me/earnings - ledger for released + held payments. */
export async function GET() {
  return handleRoute(async () => {
    const session = await requireRole("DOCTOR");

    const payments = await db.payment.findMany({
      where: { appointment: { doctor: { userId: session.userId } } },
      orderBy: { appointment: { slot: "desc" } },
      take: 100,
      select: {
        id: true,
        amount: true,
        status: true,
        releasedAt: true,
        appointment: {
          select: {
            slot: true,
            patient: { select: { name: true } },
          },
        },
      },
    });

    const total = payments.reduce((sum, payment) => sum + payment.amount, 0);
    const released = payments
      .filter((payment) => payment.status === "RELEASED")
      .reduce((sum, payment) => sum + payment.amount, 0);
    const pending = payments
      .filter((payment) => payment.status === "HOLD")
      .reduce((sum, payment) => sum + payment.amount, 0);
    const refunded = payments
      .filter((payment) => payment.status === "REFUNDED")
      .reduce((sum, payment) => sum + payment.amount, 0);

    return ok({
      summary: { total, released, pending, refunded, count: payments.length },
      payments,
    });
  });
}
