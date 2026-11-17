"use client";

import { useEffect } from "react";
import { motion } from "motion/react";
import { HugeiconsIcon, Cancel01Icon, AiBrainIcon } from "@/components/icons";
import { useI18n } from "@/lib/i18n";
import { useChat } from "./useChat";
import { AssistantMessages } from "./AssistantMessages";
import { AssistantInput } from "./AssistantInput";

export function AssistantWidget({ onClose }: { onClose: () => void }) {
  const { messages, streaming, send, input, setInput } = useChat();
  const { t } = useI18n();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 16, scale: 0.98 }}
      transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
      className="pointer-events-auto flex h-[min(70vh,560px)] w-[min(calc(100vw-2rem),380px)] flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900"
      role="dialog"
      aria-label={t.ui.assistantTitle}
    >
      <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-brand-500 text-white dark:bg-brand-400 dark:text-gray-900">
            <HugeiconsIcon icon={AiBrainIcon} size={20} aria-hidden />
          </span>
          <div>
            <p className="text-sm font-semibold text-gray-900 dark:text-gray-50">{t.ui.assistantTitle}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{t.ui.assistantTagline}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label={t.ui.assistantClose}
          className="grid h-9 w-9 place-items-center rounded-full text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100"
        >
          <HugeiconsIcon icon={Cancel01Icon} size={18} aria-hidden />
        </button>
      </div>

      <AssistantMessages messages={messages} streaming={streaming} />

      <AssistantInput value={input} onChange={setInput} onSend={send} disabled={streaming || !input.trim()} />
    </motion.div>
  );
}