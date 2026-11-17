import { db } from "@/lib/db";
import { generateOtp, hashOtp } from "@/lib/auth";
import { sendOtpSms } from "@/lib/sms";
import { otpRequestSchema, parseOrThrow } from "@/lib/validate";
import { handleRoute, ok, fail } from "@/lib/security";
import { rateLimit, limitKey } from "@/lib/rate-limit";

export const instant = false;

const OTP_TTL_MS = 5 * 60 * 1000;
const WINDOW_MS = 10 * 60 * 1000;

/**
 * POST /api/auth/otp/request - issue a 6-digit OTP (Handoff section 14).
 * Stored hashed with a 5-minute TTL. No user row is created here: an account
 * only exists after a successful verify.
 */
export async function POST(req: Request) {
  return handleRoute(async () => {
    const ip = rateLimit(`otp-req:${limitKey(req)}`, 5, WINDOW_MS);
    if (!ip.ok) {
      return fail(`অনেক বেশি চেষ্টা - ${ip.retryAfterSec} সেকেন্ড পরে চেষ্টা করুন`, 429);
    }

    const { phone } = parseOrThrow(otpRequestSchema, await req.json());

    // Per-phone cap: stops SMS bombing of one number from many IPs.
    const perPhone = rateLimit(`otp-req-phone:${phone}`, 3, WINDOW_MS);
    if (!perPhone.ok) {
      return fail(`এই নম্বরে অনেক বেশি কোড চাওয়া হয়েছে - ${perPhone.retryAfterSec} সেকেন্ড পরে চেষ্টা করুন`, 429);
    }

    const code = generateOtp();

    // Only the newest code is valid.
    await db.otpCode.updateMany({
      where: { phone, consumedAt: null },
      data: { consumedAt: new Date() },
    });
    await db.otpCode.create({
      data: {
        phone,
        codeHash: hashOtp(phone, code),
        expiresAt: new Date(Date.now() + OTP_TTL_MS),
      },
    });

    await sendOtpSms(phone, code);

    return ok({
      ok: true,
      // Dev-only echo so the sandbox flow is testable without an SMS gateway.
      devCode: process.env.NODE_ENV === "production" ? undefined : code,
    });
  });
}