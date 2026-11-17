import { db } from "@/lib/db";
import { generateOtp } from "@/lib/auth";
import { otpRequestSchema, parseOrThrow } from "@/lib/validate";
import { handleRoute, ok, fail } from "@/lib/security";
import { rateLimit, limitKey } from "@/lib/rate-limit";

export const instant = false;

/**
 * POST /api/auth/otp/request - issue a 6-digit OTP (Handoff §14).
 * Dev: code is logged server-side (no SMS provider yet). Rate-limited
 * hard because OTP spam is an abuse vector.
 */
export async function POST(req: Request) {
  return handleRoute(async () => {
    const rl = rateLimit(`otp-req:${limitKey(req)}`, 5, 10 * 60 * 1000);
    if (!rl.ok) return fail(`অনেক বেশি চেষ্টা - ${rl.retryAfterSec} সেকেন্ড পরে চেষ্টা করুন`, 429);

    const { phone } = parseOrThrow(otpRequestSchema, await req.json());

    const user = await db.user.upsert({
      where: { phone },
      create: { phone, role: "PATIENT" },
      update: {},
    });

    const code = generateOtp();
    // Dev transport. Production: SMS gateway + hashed storage + 5-min TTL.
    console.info(`[otp] ${phone} -> ${code}`);
    await db.auditLog.create({
      data: { actorId: user.id, action: "otp.request", target: phone },
    });

    return ok({
      ok: true,
      // Dev-only echo so the sandbox flow is testable end-to-end.
      devCode: process.env.NODE_ENV === "production" ? undefined : code,
    });
  });
}
