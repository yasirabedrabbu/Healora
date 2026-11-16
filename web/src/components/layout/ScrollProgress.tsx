"use client";

import { motion, useScroll, useSpring } from "motion/react";

/** Reading progress bar (brand, 2px, spring-smoothed). No gradients needed. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.4 });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-60 h-0.5 origin-left bg-brand-500 dark:bg-brand-300"
    />
  );
}
