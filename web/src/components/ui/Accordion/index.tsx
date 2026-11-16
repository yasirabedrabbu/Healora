"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { HugeiconsIcon, AddIcon, MinusIcon } from "@/components/icons";
import { accordionPanel, accordionTrigger } from "./variants";
import type { AccordionProps } from "./types";

/** Uncontrolled default: manages its own open state. */
export function Accordion({ items, openId, onOpenChange, className }: AccordionProps) {
  const [internal, setInternal] = useState<string | null>(items[0]?.id ?? null);
  const active = openId !== undefined ? openId : internal;
  const setOpen = (id: string | null) => {
    setInternal(id);
    onOpenChange?.(id);
  };

  return (
    <div className={className}>
      {items.map((item) => {
        const open = active === item.id;
        const panelId = `acc-${item.id}`;
        return (
          <div key={item.id} className="border-b border-gray-200 last:border-b-0 dark:border-gray-800">
            <h3>
              <button
                type="button"
                id={`acc-btn-${item.id}`}
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpen(open ? null : item.id)}
                className={accordionTrigger}
              >
                {item.question}
                <HugeiconsIcon
                  icon={open ? MinusIcon : AddIcon}
                  size={20}
                  aria-hidden
                  className="shrink-0 text-gray-400"
                />
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  key={panelId}
                  id={panelId}
                  role="region"
                  aria-labelledby={`acc-btn-${item.id}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                  className={accordionPanel}
                >
                  <p className="py-4 text-sm">{item.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
