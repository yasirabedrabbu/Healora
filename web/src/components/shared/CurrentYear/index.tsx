"use client";

import { useEffect, useState } from "react";

/**
 * Client island: the current year is an unstable value that must not be
 * evaluated during prerender (Next.js Cache Components, build crash in
 * audit). The read is deferred to useEffect so prerender stays stable.
 */
export function CurrentYear() {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return <>{year ?? 2026}</>;
}
