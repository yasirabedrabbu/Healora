import { db } from "@/lib/db";
import { pushToUser } from "@/lib/push";

export type NotificationInput = {
  userId: string;
  title: string;
  body: string;
  type: "appointment" | "record" | "refill" | "emergency" | "system" | "lab" | "pharmacy" | "ambulance" | "queue";
  dedupeKey?: string;
};

/**
 * Internal notification writer. Domain services call this after a successful
 * transaction; channel delivery is opt-in (FCM when configured), while the
 * in-app copy is always persisted.
 */
export async function createNotification(input: NotificationInput) {
  const notification = await db.notification.create({ data: input });
  void pushToUser(input.userId, input.title, input.body, { type: input.type }).catch(
    () => undefined
  );
  return notification;
}
