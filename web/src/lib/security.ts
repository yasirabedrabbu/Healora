import { NextResponse } from "next/server";

/**
 * Shared API response + security helpers (Handoff section 14).
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
  h.set("Cache-Control", "no-store");
  return h;
}

/** Known Prisma error codes mapped to clean client errors. */
const PRISMA_ERRORS: Record<string, { status: number; message: string }> = {
  P2002: { status: 409, message: "এই তথ্য আগেই আছে" },
  P2003: { status: 400, message: "সংযুক্ত তথ্য পাওয়া যায়নি" },
  P2025: { status: 404, message: "তথ্য পাওয়া যায়নি" },
};

/**
 * Central error boundary for route handlers. Thrown errors with a `status`
 * become clean JSON; bad JSON bodies are 400; everything else is logged
 * server-side (name + code only in production) and returned as a generic 500.
 */
export async function handleRoute(fn: () => Promise<Response>): Promise<Response> {
  try {
    return await fn();
  } catch (err) {
    const e = err as Error & { status?: number; code?: string };

    if (e.status && e.status !== 500) return fail(e.message, e.status);
    if (err instanceof SyntaxError) return fail("অবৈধ JSON", 400);

    const mapped = e.code ? PRISMA_ERRORS[e.code] : undefined;
    if (mapped) return fail(mapped.message, mapped.status);

    // Never log request bodies (medical data). Production: name + code only.
    console.error(
      "[api] unhandled",
      process.env.NODE_ENV === "production" ? `${e.name} ${e.code ?? ""}` : e
    );
    return fail("সার্ভার ত্রুটি", 500);
  }
}