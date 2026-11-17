/**
 * Central env access. Production must set AUTH_SECRET (min 16 chars);
 * dev falls back to a fixed value so local runs work without .env.
 */
const DEV_FALLBACK = "dev-only-secret-change-me";

export function authSecret(): string {
  const value = process.env.AUTH_SECRET;
  if (value && value.length >= 16) return value;
  if (process.env.NODE_ENV === "production") {
    throw new Error("AUTH_SECRET must be set (min 16 chars) in production");
  }
  return DEV_FALLBACK;
}