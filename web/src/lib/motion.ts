import type { Variants, Transition } from "motion/react";

/**
 * Shared Framer Motion variants (Untitled UI motion spec):
 * ease cubic-bezier(0.4,0,0.2,1), durations 150/200/300/400ms,
 * stagger 40-60ms. Reduced-motion components must render static
 * fallbacks instead of these.
 */
export const EASE_STANDARD: Transition["ease"] = [0.4, 0, 0.2, 1];

export const DURATION = {
  fast: 0.15,
  base: 0.2,
  medium: 0.3,
  slow: 0.4,
} as const;

export const STAGGER = 0.05;

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: DURATION.base, ease: EASE_STANDARD } },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.slow, ease: EASE_STANDARD },
  },
};

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.medium, ease: EASE_STANDARD },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: DURATION.medium, ease: EASE_STANDARD },
  },
};

/** Container that staggers children 50ms apart. */
export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: STAGGER } },
};

/** Accordion height/opacity pair for content panels. */
export const accordionPanel: Variants = {
  hidden: { height: 0, opacity: 0, transition: { duration: DURATION.fast, ease: EASE_STANDARD } },
  visible: {
    height: "auto",
    opacity: 1,
    transition: { duration: DURATION.medium, ease: EASE_STANDARD },
  },
};
