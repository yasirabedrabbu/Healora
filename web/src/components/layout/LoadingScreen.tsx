"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { HugeiconsIcon, HealthIcon } from "@/components/icons";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { siteConfig } from "@/config/site";

const SEEN_KEY = "healora-splash-seen";

/**
 * First-visit branded splash (session-only). Skips portal navigations,
 * reduced-motion users, and repeat visits within the session.
 */
export function LoadingScreen() {
  const [show, setShow] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    try {
      if (sessionStorage.getItem(SEEN_KEY)) return;
      sessionStorage.setItem(SEEN_KEY, "1");
    } catch {
      /* storage blocked: still show once */
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // rAF defers setState out of the effect body (set-state-in-effect rule).
    const raf = requestAnimationFrame(() => setShow(true));
    const t = setTimeout(() => setShow(false), 900);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t);
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="splash"
          aria-hidden
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-0 z-999 grid place-items-center bg-white dark:bg-gray-900"
        >
          <div className="flex flex-col items-center gap-4">
            <motion.span
              initial={reduce ? undefined : { scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className="grid h-16 w-16 place-items-center rounded-2xl bg-brand-500 text-white"
            >
              <HugeiconsIcon icon={HealthIcon} size={32} aria-hidden />
            </motion.span>
            <motion.span
              initial={reduce ? undefined : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15, ease: [0.4, 0, 0.2, 1] }}
              className="font-heading text-2xl font-bold text-gray-900 dark:text-gray-50"
            >
              {siteConfig.name}
            </motion.span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              বিশ্বাসের সাথে সুস্থতা
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
