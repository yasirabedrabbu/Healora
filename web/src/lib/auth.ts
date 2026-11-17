import { createHmac, randomInt, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { db } from "@/lib/db";
import { authSecret } from "@/lib/env";
import {
  SESSION_COOKIE,
  SESSION_TTL_MS,
  createToken,
  verifyToken,
  type SessionPayload,
} from "@/lib/session-token";

/**
 * OTP-first auth (Handoff section 7). HS256 session in an HttpOnly cookie.
 * The role is read from the database on every request, so a role change or
 * revoke applies immediately instead of after the 7-day cookie expires.
 */
export { SESSION_COOKIE };
export type { SessionPayload };

function httpError(message: string, status: number): Error & { status: number } {
  return Object.assign(new Error(message), { status });
}

export async function setSessionCookie(userId: string, role: string): Promise<void> {
  const jar = await cookies();
  jar.set(SESSION_COOKIE, createToken(userId, role), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: SESSION_TTL_MS / 1000,
    path: "/",
  });
}

export async function clearSessionCookie(): Promise<void> {
  const jar = await cookies();
  jar.delete(SESSION_COOKIE);
}

/** Current session for route handlers / server components, or null. */
export async function getSession(): Promise<SessionPayload | null> {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  const payload = token ? verifyToken(token) : null;
  if (!payload) return null;

  const user = await db.user.findUnique({
    where: { id: payload.userId },
    select: { role: true },
  });
  if (!user) return null;
  return { ...payload, role: user.role };
}

/** Guard for protected routes. Throws a 401-ready error when absent. */
export async function requireSession(): Promise<SessionPayload> {
  const session = await getSession();
  if (!session) throw httpError("লগইন প্রয়োজন", 401);
  return session;
}

/** Role guard - admin never sees medical content (Handoff section 9). */
export async function requireRole(...roles: string[]): Promise<SessionPayload> {
  const session = await requireSession();
  if (!roles.includes(session.role)) throw httpError("অনুমতি নেই", 403);
  return session;
}

/** 6-digit OTP: crypto-random, zero-padded. */
export function generateOtp(): string {
  return String(randomInt(0, 1_000_000)).padStart(6, "0");
}

/** OTPs are stored hashed (keyed with AUTH_SECRET), never in plain text. */
export function hashOtp(phone: string, code: string): string {
  return createHmac("sha256", authSecret())
    .update(`otp:${phone}:${code}`)
    .digest("hex");
}

export function otpMatches(phone: string, code: string, storedHash: string): boolean {
  const a = Buffer.from(hashOtp(phone, code));
  const b = Buffer.from(storedHash);
  return a.length === b.length && timingSafeEqual(a, b);
}