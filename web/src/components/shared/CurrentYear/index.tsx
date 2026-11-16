"use client";

import { useEffect, useState } from "react";

/**
 * Client island: the current year is an unstable value that must not be
 * evaluated during prerender (Next.js Cache Components). The read is
 * deferred via rAF so no setState runs synchronously in the effect body.
 */
export function CurrentYear() {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setYear(new Date().getFullYear()));
    return () => cancelAnimationFrame(raf);
  }, []);

  return <>{year ?? 2026}</>;
}
