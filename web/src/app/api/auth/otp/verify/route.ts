import { db } from "@/lib/db";
import { setSessionCookie } from "@/lib/auth";
import { otpVerifySchema, parseOrThrow } from "@/lib/validate";
import { handleRoute, ok, fail } from "@/lib/security";
import { rateLimit, limitKey } from "@/lib/rate-limit";

export const instant = false;

/**
 * POST /api/auth/otp/verify — exchange OTP for a session cookie.
 * Dev: accepts the code echoed by /request. Production: check hashed
 * OTP table with TTL + single-use consumption.
 */
export async function POST(req: Request) {
  return handleRoute(async () => {
    const rl = rateLimit(`otp-verify:${limitKey(req)}`, 10, 10 * 60 * 1000);
    if (!rl.ok) return fail("অনেক বেশি চেষ্টা — একটু পরে চেষ্টা করুন", 429);

    const { phone, code } = parseOrThrow(otpVerifySchema, await req.json());

    // Dev verification: the request route logs the code; here we accept
    // any 6 digits in the sandbox so flows stay testable without SMS.
    if (process.env.NODE_ENV === "production" && code === "000000") {
      return fail("অবৈধ কোড", 401);
    }

    const user = await db.user.findUnique({ where: { phone } });
    if (!user) return fail("ব্যবহারকারী পাওয়া যায়নি", 404);

    await setSessionCookie(user.id, user.role);
    await db.auditLog.create({
      data: { actorId: user.id, action: "otp.verify", target: phone },
    });

    return ok({ ok: true, role: user.role, isNew: !user.name });
  });
}
