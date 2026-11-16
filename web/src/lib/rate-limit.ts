/**
 * In-memory sliding-window rate limiter.
 * Single-instance demo limit; production swaps the store for Redis
 * (Handoff §15: Redis) without changing the call site.
 */
type Bucket = { hits: number[] };

const buckets = new Map<string, Bucket>();

export type RateLimitResult = {
  ok: boolean;
  remaining: number;
  retryAfterSec: number;
};

export function rateLimit(key: string, limit: number, windowMs: number): RateLimitResult {
  const now = Date.now();
  const bucket = buckets.get(key) ?? { hits: [] };
  bucket.hits = bucket.hits.filter((t) => now - t < windowMs);

  if (bucket.hits.length >= limit) {
    const retryAfterMs = windowMs - (now - bucket.hits[0]);
    buckets.set(key, bucket);
    return { ok: false, remaining: 0, retryAfterSec: Math.ceil(retryAfterMs / 1000) };
  }

  bucket.hits.push(now);
  buckets.set(key, bucket);

  // Opportunistic cleanup: keep the map bounded.
  if (buckets.size > 5000) {
    for (const [k, b] of buckets) {
      if (b.hits.every((t) => now - t >= windowMs)) buckets.delete(k);
    }
  }

  return { ok: true, remaining: limit - bucket.hits.length, retryAfterSec: 0 };
}

/** Derive a limiter key: authenticated id first, else IP. */
export function limitKey(req: Request, userId?: string): string {
  if (userId) return `u:${userId}`;
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "local";
  return `ip:${ip}`;
}
