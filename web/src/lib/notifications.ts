import { db } from "@/lib/db";

export type NotificationInput = {
  userId: string;
  title: string;
  body: string;
  type: "appointment" | "record" | "refill" | "emergency" | "system" | "lab" | "pharmacy" | "ambulance" | "queue";
  dedupeKey?: string;
};

/**
 * Internal notification writer. Domain services call this after a successful
 * transaction; channel delivery remains opt-in until an SMS/email provider is
 * configured, while the in-app copy is always persisted.
 */
export async function createNotification(input: NotificationInput) {
  return db.notification.create({ data: input });
}
