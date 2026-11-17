"use client";

import { motion } from "motion/react";
import { useReducedMotion } from "@/lib/useReducedMotion";

/**
 * Scroll-in reveal for sections. Replaces the old GSAP reveal - GSAP is
 * now reserved for the HowItWorks scrollytelling only (motion budget).
 */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.4, delay, ease: [0.4, 0, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}
