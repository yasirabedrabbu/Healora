import { clearSessionCookie } from "@/lib/auth";
import { handleRoute, ok } from "@/lib/security";

export const instant = false;

/** POST /api/auth/logout - clear the session cookie. */
export async function POST() {
  return handleRoute(async () => {
    await clearSessionCookie();
    return ok({ ok: true });
  });
}
