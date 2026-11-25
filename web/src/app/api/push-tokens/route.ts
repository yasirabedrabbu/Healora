import { db } from "@/lib/db";
import { requireSession } from "@/lib/auth";
import { handleRoute, ok, fail } from "@/lib/security";
import { parseOrThrow, pushTokenSchema } from "@/lib/validate";

export const instant = false;

/** GET /api/push-tokens - the caller's registered devices. */
export async function GET() {
  return handleRoute(async () => {
    const session = await requireSession();
    const tokens = await db.pushToken.findMany({
      where: { userId: session.userId, active: true },
      select: { id: true, platform: true, createdAt: true },
      orderBy: { createdAt: "desc" },
      take: 20,
    });
    return ok({ tokens });
  });
}

/** POST /api/push-tokens - register or reactivate a device token. */
export async function POST(req: Request) {
  return handleRoute(async () => {
    const session = await requireSession();
    const data = parseOrThrow(pushTokenSchema, await req.json());

    const existing = await db.pushToken.findUnique({
      where: { token: data.token },
      select: { id: true, userId: true },
    });
    if (existing && existing.userId !== session.userId) {
      return fail("এই ডিভাইস টোকেন অন্য অ্যাকাউন্টে নিবন্ধিত", 409);
    }

    const token = await db.pushToken.upsert({
      where: { token: data.token },
      create: {
        userId: session.userId,
        token: data.token,
        platform: data.platform,
      },
      update: { active: true, platform: data.platform },
      select: { id: true, platform: true, active: true },
    });
    return ok({ token }, { status: 201 });
  });
}

/** DELETE /api/push-tokens?token= - unregister the caller's device. */
export async function DELETE(req: Request) {
  return handleRoute(async () => {
    const session = await requireSession();
    const token = new URL(req.url).searchParams.get("token");
    if (!token) return fail("টোকেন দিন", 400);

    const deleted = await db.pushToken.deleteMany({
      where: { token, userId: session.userId },
    });
    if (deleted.count === 0) return fail("টোকেন পাওয়া যায়নি", 404);
    return ok({ ok: true });
  });
}
