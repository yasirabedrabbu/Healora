import { createHmac, timingSafeEqual } from "node:crypto";
import { authSecret } from "./env";

export const SESSION_COOKIE = "healora_session";
export const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 7;

export type SessionPayload = { userId: string; role: string; exp: number };

function sign(data: string): string {
  return createHmac("sha256", authSecret()).update(data).digest("base64url");
}

export function createToken(userId: string, role: string): string {
  const payload: SessionPayload = {
    userId,
    role,
    exp: Date.now() + SESSION_TTL_MS,
  };
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${body}.${sign(body)}`;
}

export function verifyToken(token: string): SessionPayload | null {
  const [body, sig] = token.split(".");
  if (!body || !sig) return null;
  const a = Buffer.from(sig);
  const b = Buffer.from(sign(body));
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  try {
    const payload = JSON.parse(
      Buffer.from(body, "base64url").toString()
    ) as SessionPayload;
    return payload.exp > Date.now() ? payload : null;
  } catch {
    return null;
  }
}