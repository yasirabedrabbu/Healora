import { db } from "@/lib/db";
import { requireRole } from "@/lib/auth";
import { handleRoute, ok } from "@/lib/security";

export const instant = false;

/** GET /api/admin/payments - settlement overview (no medical content). */
export async function GET() {
  return handleRoute(async () => {
    await requireRole("ADMIN");

    const payments = await db.payment.findMany({
      orderBy: { appointment: { slot: "desc" } },
      take: 100,
      select: {
        id: true,
        amount: true,
        status: true,
        gateway: true,
        releasedAt: true,
        appointment: {
          select: {
            slot: true,
            doctor: { select: { specialty: true } },
          },
        },
      },
    });

    const sum = (status: string) =>
      payments
        .filter((payment) => payment.status === status)
        .reduce((total, payment) => total + payment.amount, 0);

    const byStatus = {
      hold: sum("HOLD"),
      released: sum("RELEASED"),
      refunded: sum("REFUNDED"),
    };

    const byGateway = payments.reduce<Record<string, number>>((acc, payment) => {
      acc[payment.gateway] = (acc[payment.gateway] ?? 0) + payment.amount;
      return acc;
    }, {});

    return ok({
      summary: { ...byStatus, total: byStatus.hold + byStatus.released, count: payments.length },
      byGateway,
      payments,
    });
  });
}
