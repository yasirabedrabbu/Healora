"use client";

import { useState } from "react";
import { AnimatePresence } from "motion/react";
import { HugeiconsIcon, AiBrainIcon } from "@/components/icons";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { motion } from "motion/react";
import { AssistantWidget } from "./index";

/** FAB toggle for the assistant — accessible name, reduced-motion safe. */
export function AssistantLauncher() {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  return (
    <>
      <AnimatePresence>
        {open && <AssistantWidget key="widget" onClose={() => setOpen(false)} />}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? "সহকারী বন্ধ করুন" : "স্বাস্থ্য সহকারী খুলুন"}
        initial={reduce ? undefined : { scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={reduce ? undefined : { scale: 1.06 }}
        whileTap={reduce ? undefined : { scale: 0.94 }}
        transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
        className="fixed bottom-6 right-6 z-50 grid h-14 w-14 place-items-center rounded-full bg-brand-500 text-white"
      >
        <HugeiconsIcon icon={AiBrainIcon} size={24} aria-hidden />
      </motion.button>
    </>
  );
}
