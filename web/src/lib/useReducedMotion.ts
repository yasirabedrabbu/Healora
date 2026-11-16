"use client";

import { useSyncExternalStore } from "react";

/**
 * SSR-safe prefers-reduced-motion via useSyncExternalStore — no setState
 * in effects (react-hooks/set-state-in-effect rule). Every GSAP/Three/
 * Framer path must check this and render a static fallback.
 */
const query = "(prefers-reduced-motion: reduce)";

function subscribe(callback: () => void) {
  const mq = window.matchMedia(query);
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

export function useReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false
  );
}
