import { NextResponse } from "next/server";

/**
 * Shared API response + security helpers (Handoff §14).
 * Every route returns through these so headers stay consistent.
 */

export function ok<T>(data: T, init?: ResponseInit) {
  return NextResponse.json(data, { ...init, headers: secureHeaders(init?.headers) });
}

export function fail(message: string, status = 400) {
  return NextResponse.json(
    { error: message },
    { status, headers: secureHeaders() }
  );
}

export function secureHeaders(extra?: HeadersInit): Headers {
  const h = new Headers(extra);
  h.set("X-Content-Type-Options", "nosniff");
  h.set("Referrer-Policy", "strict-origin-when-cross-origin");
  h.set("X-Frame-Options", "DENY");
  return h;
}

/**
 * Central error boundary for route handlers: turns thrown Errors with a
 * `status` field into clean JSON, hides internals otherwise.
 */
export async function handleRoute(fn: () => Promise<Response>): Promise<Response> {
  try {
    return await fn();
  } catch (err) {
    const e = err as Error & { status?: number };
    const status = e.status ?? 500;
    // Never leak stack traces (medical data platform: fail closed).
    return fail(status === 500 ? "সার্ভার ত্রুটি" : e.message, status);
  }
}
