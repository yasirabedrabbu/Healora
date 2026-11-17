"use client";

import { useState } from "react";
import { AnimatePresence } from "motion/react";
import { HugeiconsIcon, AiBrainIcon, Cancel01Icon } from "@/components/icons";
import { useI18n } from "@/lib/i18n";
import { AssistantWidget } from "./index";

/** Fixed bottom-right stack: panel above, FAB below. StickyCTA leaves 5.5rem free on mobile. */
export function AssistantLauncher() {
  const [open, setOpen] = useState(false);
  const { t } = useI18n();

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3 md:bottom-6 md:right-6">
      <AnimatePresence>
        {open && <AssistantWidget key="widget" onClose={() => setOpen(false)} />}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? t.ui.assistantClose : t.ui.assistantOpen}
        className="pointer-events-auto grid h-14 w-14 place-items-center rounded-full bg-gray-900 text-white transition-transform duration-200 ease-standard hover:scale-105 active:scale-95 dark:bg-white dark:text-gray-900"
      >
        <HugeiconsIcon icon={open ? Cancel01Icon : AiBrainIcon} size={24} aria-hidden />
      </button>
    </div>
  );
}