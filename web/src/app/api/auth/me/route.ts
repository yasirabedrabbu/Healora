import { db } from "@/lib/db";
import { requireSession } from "@/lib/auth";
import { handleRoute, ok } from "@/lib/security";

export const instant = false;

/** GET /api/auth/me - current user profile (never other users'). */
export async function GET() {
  return handleRoute(async () => {
    const session = await requireSession();
    const user = await db.user.findUnique({
      where: { id: session.userId },
      select: {
        id: true, phone: true, email: true, role: true,
        name: true, bloodGroup: true, area: true,
      },
    });
    return ok({ user });
  });
}
