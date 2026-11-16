"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { HugeiconsIcon, Cancel01Icon } from "@/components/icons";
import { panelBase, panelSizes, overlayBase, closeBtn } from "./variants";
import type { ModalProps } from "./types";

const EASE: [number, number, number, number] = [0.4, 0, 0.2, 1];

export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  size = "md",
}: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  // Escape closes; focus lands in the dialog for keyboard users.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    panelRef.current?.focus();
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15, ease: EASE }}>
          <div className={overlayBase} onClick={onClose} aria-hidden />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={title}
            tabIndex={-1}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.2, ease: EASE }}
            className={`${panelBase} ${panelSizes[size]}`}
          >
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-50">{title}</h2>
                {description && <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{description}</p>}
              </div>
              <button type="button" onClick={onClose} className={closeBtn} aria-label="Close dialog">
                <HugeiconsIcon icon={Cancel01Icon} size={20} aria-hidden />
              </button>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">{children}</div>
            {footer && <div className="mt-6 flex justify-end gap-3">{footer}</div>}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
