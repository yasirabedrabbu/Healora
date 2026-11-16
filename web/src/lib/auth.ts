import { createHmac, timingSafeEqual, randomInt } from "node:crypto";
import { cookies } from "next/headers";

/**
 * OTP-first auth per Handoff §7 (JWT + OTP). Self-contained HS256 session
 * tokens in an HttpOnly cookie — no password surface, no OAuth, matching
 * the medical-data rule that only phone/email identity is needed.
 *
 * In dev OTP codes are logged to the server console (no SMS provider yet,
 * Handoff §15: provider TBD). In production the send step swaps to the
 * SMS gateway — the flow shape never changes.
 */
const SECRET = process.env.AUTH_SECRET ?? "dev-only-secret-change-me";
export const SESSION_COOKIE = "healora_session";
const TTL_MS = 1000 * 60 * 60 * 24 * 7;

export type SessionPayload = { userId: string; role: string; exp: number };

function b64url(input: string | Buffer): string {
  return Buffer.from(input).toString("base64url");
}

function sign(data: string): string {
  return createHmac("sha256", SECRET).update(data).digest("base64url");
}

export function createToken(userId: string, role: string): string {
  const payload: SessionPayload = {
    userId,
    role,
    exp: Date.now() + TTL_MS,
  };
  const body = b64url(JSON.stringify(payload));
  return `${body}.${sign(body)}`;
}

export function verifyToken(token: string): SessionPayload | null {
  const [body, sig] = token.split(".");
  if (!body || !sig) return null;
  const expected = sign(body);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  try {
    const payload = JSON.parse(Buffer.from(body, "base64url").toString()) as SessionPayload;
    if (payload.exp < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}

export async function setSessionCookie(userId: string, role: string): Promise<void> {
  const jar = await cookies();
  jar.set(SESSION_COOKIE, createToken(userId, role), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: TTL_MS / 1000,
    path: "/",
  });
}

export async function clearSessionCookie(): Promise<void> {
  const jar = await cookies();
  jar.delete(SESSION_COOKIE);
}

/** Read the current session in route handlers / server components. */
export async function getSession(): Promise<SessionPayload | null> {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  return token ? verifyToken(token) : null;
}

/** Guard for protected routes. Throws a 401-ready error when absent. */
export async function requireSession(): Promise<SessionPayload> {
  const session = await getSession();
  if (!session) {
    const err = new Error("লগইন প্রয়োজন") as Error & { status?: number };
    err.status = 401;
    throw err;
  }
  return session;
}

/** Role guard — admin never sees medical content (Handoff §9). */
export async function requireRole(...roles: string[]): Promise<SessionPayload> {
  const session = await requireSession();
  if (!roles.includes(session.role)) {
    const err = new Error("অনুমতি নেই") as Error & { status?: number };
    err.status = 403;
    throw err;
  }
  return session;
}

/** 6-digit OTP: crypto-random, no leading-zero bias. */
export function generateOtp(): string {
  return String(randomInt(0, 1_000_000)).padStart(6, "0");
}
