import { db } from "@/lib/db";
import { otpMatches, setSessionCookie } from "@/lib/auth";
import { otpVerifySchema, parseOrThrow } from "@/lib/validate";
import { handleRoute, ok, fail } from "@/lib/security";
import { rateLimit, limitKey } from "@/lib/rate-limit";

export const instant = false;

const MAX_ATTEMPTS = 5;

/**
 * POST /api/auth/otp/verify - exchange a valid OTP for a session cookie.
 * Checks the hashed code, TTL, attempt cap and single use.
 */
export async function POST(req: Request) {
  return handleRoute(async () => {
    const rl = rateLimit(`otp-verify:${limitKey(req)}`, 10, 10 * 60 * 1000);
    if (!rl.ok) return fail("অনেক বেশি চেষ্টা - একটু পরে চেষ্টা করুন", 429);

    const { phone, code } = parseOrThrow(otpVerifySchema, await req.json());

    const otp = await db.otpCode.findFirst({
      where: { phone, consumedAt: null, expiresAt: { gt: new Date() } },
      orderBy: { createdAt: "desc" },
    });
    if (!otp) return fail("কোডের মেয়াদ শেষ বা অবৈধ - নতুন কোড নিন", 401);

    if (otp.attempts >= MAX_ATTEMPTS) {
      await db.otpCode.update({
        where: { id: otp.id },
        data: { consumedAt: new Date() },
      });
      return fail("অনেক ভুল চেষ্টা - নতুন কোড নিন", 429);
    }

    if (!otpMatches(phone, code, otp.codeHash)) {
      await db.otpCode.update({
        where: { id: otp.id },
        data: { attempts: { increment: 1 } },
      });
      return fail("ভুল কোড", 401);
    }

    // Single use: only one request can flip consumedAt from null.
    const claimed = await db.otpCode.updateMany({
      where: { id: otp.id, consumedAt: null },
      data: { consumedAt: new Date() },
    });
    if (claimed.count === 0) return fail("কোডটি আগেই ব্যবহার হয়েছে", 401);

    const user = await db.user.upsert({
      where: { phone },
      create: { phone, role: "PATIENT" },
      update: {},
    });

    await setSessionCookie(user.id, user.role);
    await db.auditLog.create({
      data: { actorId: user.id, action: "otp.verify", target: phone },
    });

    return ok({ ok: true, role: user.role, isNew: !user.name });
  });
}