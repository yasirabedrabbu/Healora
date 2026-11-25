import { db } from "@/lib/db";
import { handleRoute, ok, fail } from "@/lib/security";
import { createNotification } from "@/lib/notifications";

export const instant = false;

const REMINDER_WINDOW_MS = 30 * 60 * 1000;
const NO_SHOW_GRACE_MS = 30 * 60 * 1000;
const QUEUE_STALE_MS = 24 * 60 * 60 * 1000;

function authorize(req: Request): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return process.env.NODE_ENV !== "production";
  const bearer = req.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  const header = req.headers.get("x-cron-secret");
  return bearer === secret || header === secret;
}

async function sendReminders(now: Date) {
  const upcoming = await db.appointment.findMany({
    where: { status: "BOOKED", slot: { gt: now, lte: new Date(now.getTime() + REMINDER_WINDOW_MS) } },
    select: {
      id: true,
      slot: true,
      patientId: true,
      doctor: { select: { user: { select: { name: true } } } },
    },
    take: 100,
  });

  let sent = 0;
  for (const appointment of upcoming) {
    try {
      await createNotification({
        userId: appointment.patientId,
        title: "অ্যাপয়েন্টমেন্ট রিমাইন্ডার",
        body: `${appointment.doctor.user.name ?? "ডাক্তার"} এর সাথে ${appointment.slot.toLocaleString("bn-BD")} এ অ্যাপয়েন্টমেন্ট।`,
        type: "appointment",
        dedupeKey: `reminder:${appointment.id}`,
      });
      sent += 1;
    } catch (err) {
      if ((err as { code?: string }).code !== "P2002") throw err;
    }
  }
  return sent;
}

async function markNoShows(now: Date) {
  const stale = await db.appointment.findMany({
    where: {
      status: "BOOKED",
      slot: { lt: new Date(now.getTime() - NO_SHOW_GRACE_MS) },
      consultation: null,
    },
    select: { id: true, patientId: true },
    take: 100,
  });

  let marked = 0;
  for (const appointment of stale) {
    const updated = await db.appointment.updateMany({
      where: { id: appointment.id, status: "BOOKED" },
      data: { status: "NO_SHOW" },
    });
    if (updated.count === 0) continue;

    await db.payment.updateMany({
      where: { appointmentId: appointment.id, status: "HOLD" },
      data: { status: "REFUNDED", releasedAt: null },
    });
    await createNotification({
      userId: appointment.patientId,
      title: "অ্যাপয়েন্টমেন্টে উপস্থিত হননি",
      body: "নির্ধারিত সময়ে যোগাযোগ না হওয়ায় অ্যাপয়েন্টমেন্টটি বাতিল হয়েছে। পেমেন্ট রিফান্ড প্রক্রিয়া শুরু হয়েছে।",
      type: "appointment",
      dedupeKey: `no-show:${appointment.id}`,
    }).catch(() => undefined);
    marked += 1;
  }
  return marked;
}

/**
 * GET /api/cron/maintenance - idempotent scheduled maintenance.
 * Protect with `CRON_SECRET` (Authorization: Bearer or x-cron-secret).
 * Jobs: 30-minute reminders, no-show refunds, expired prescriptions,
 * stale hospital tokens.
 */
export async function GET(req: Request) {
  return handleRoute(async () => {
    if (!authorize(req)) return fail("অনুমতি নেই", 401);
    const now = new Date();

    const [reminders, noShows, expiredPrescriptions, staleTickets] = await Promise.all([
      sendReminders(now),
      markNoShows(now),
      db.prescription.updateMany({
        where: { status: "ACTIVE", validUntil: { lt: now } },
        data: { status: "EXPIRED" },
      }),
      db.queueTicket.updateMany({
        where: { status: { in: ["WAITING", "CALLED"] }, createdAt: { lt: new Date(now.getTime() - QUEUE_STALE_MS) } },
        data: { status: "NO_SHOW" },
      }),
    ]);

    return ok({
      ok: true,
      ranAt: now.toISOString(),
      reminders,
      noShows,
      expiredPrescriptions: expiredPrescriptions.count,
      staleTickets: staleTickets.count,
    });
  });
}
