import { db } from "@/lib/db";
import { requireSession } from "@/lib/auth";
import { handleRoute, ok } from "@/lib/security";
import {
  parseOrThrow,
  updateProfileSchema,
  userSettingsSchema,
} from "@/lib/validate";

export const instant = false;

/** GET /api/settings - caller's profile and persisted preferences. */
export async function GET() {
  return handleRoute(async () => {
    const session = await requireSession();
    const user = await db.user.findUniqueOrThrow({
      where: { id: session.userId },
      select: {
        name: true,
        phone: true,
        email: true,
        bloodGroup: true,
        area: true,
        role: true,
        settings: true,
      },
    });
    return ok({ user, settings: user.settings });
  });
}

/** PATCH /api/settings - replace profile and preference values atomically. */
export async function PATCH(req: Request) {
  return handleRoute(async () => {
    const session = await requireSession();
    const body = parseOrThrow(
      updateProfileSchema.merge(userSettingsSchema),
      await req.json()
    );
    const { name, bloodGroup, area, ...settings } = body;
    const result = await db.$transaction(async (tx) => {
      const user = await tx.user.update({
        where: { id: session.userId },
        data: { name, bloodGroup, area },
        select: { name: true, phone: true, email: true, bloodGroup: true, area: true, role: true },
      });
      const preference = await tx.userSettings.upsert({
        where: { userId: session.userId },
        create: { userId: session.userId, ...settings },
        update: settings,
      });
      return { user, settings: preference };
    });
    return ok(result);
  });
}
