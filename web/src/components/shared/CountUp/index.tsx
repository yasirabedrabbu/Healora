"use client";

import { useEffect, useRef } from "react";
import { animate, useInView } from "motion/react";
import { useReducedMotion } from "@/lib/useReducedMotion";

const BN_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

export function toBengaliDigits(n: number): string {
  return String(n)
    .split("")
    .map((d) => BN_DIGITS[Number(d)] ?? d)
    .join("");
}

/**
 * Count-up stat. Animates 0→target with Bengali digit output;
 * static fallback under reduced motion.
 */
export function CountUp({
  target,
  suffix = "",
  duration = 1.2,
}: {
  target: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!inView) return;
    const el = ref.current;
    if (!el) return;
    if (reduce) {
      el.textContent = toBengaliDigits(target) + suffix;
      return;
    }
    const controls = animate(0, target, {
      duration,
      ease: [0.4, 0, 0.2, 1],
      onUpdate: (v) => {
        el.textContent = toBengaliDigits(Math.round(v)) + suffix;
      },
    });
    return () => controls.stop();
  }, [inView, target, suffix, duration, reduce]);

  return <span ref={ref}>{toBengaliDigits(target) + suffix}</span>;
}
