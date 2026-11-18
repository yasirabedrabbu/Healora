import { db } from "@/lib/db";
import { requireSession } from "@/lib/auth";
import { handleRoute, ok } from "@/lib/security";
import { notificationReadSchema, parseOrThrow } from "@/lib/validate";

export const instant = false;

/** GET /api/notifications - most recent in-app notices for the signed-in user. */
export async function GET() {
  return handleRoute(async () => {
    const session = await requireSession();
    const notifications = await db.notification.findMany({
      where: { userId: session.userId },
      orderBy: { createdAt: "desc" },
      take: 30,
    });
    const unread = notifications.filter((notice) => !notice.readAt).length;
    return ok({ notifications, unread });
  });
}

/** PATCH /api/notifications - mark selected notification IDs as read. */
export async function PATCH(req: Request) {
  return handleRoute(async () => {
    const session = await requireSession();
    const { ids } = parseOrThrow(notificationReadSchema, await req.json());
    const result = await db.notification.updateMany({
      where: { id: { in: ids }, userId: session.userId, readAt: null },
      data: { readAt: new Date() },
    });
    return ok({ updated: result.count });
  });
}
