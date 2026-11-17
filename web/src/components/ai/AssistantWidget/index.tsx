"use client";

import { useChat } from "./useChat";
import { AssistantMessages } from "./AssistantMessages";
import { AssistantInput } from "./AssistantInput";
import { motion } from "motion/react";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { HugeiconsIcon, Cancel01Icon, AiBrainIcon } from "@/components/icons";

/** Floating chat panel - streaming, disclaimers, reduced-motion safe. */
export function AssistantWidget({ onClose }: { onClose: () => void }) {
  const { messages, streaming, send, input, setInput } = useChat();
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? undefined : { opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
      className="flex h-[min(70vh,560px)] w-[min(92vw,380px)] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900"
      role="dialog"
      aria-label="হিলোরা স্বাস্থ্য সহকারী"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3 dark:border-gray-800">
        <div className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-500 text-white">
            <HugeiconsIcon icon={AiBrainIcon} size={18} aria-hidden />
          </span>
          <div>
            <p className="text-sm font-semibold text-gray-900 dark:text-gray-50">স্বাস্থ্য সহকারী</p>
            <p className="text-[11px] text-gray-400">ডায়াগনোসিস নয় - পথ দেখায়</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="বন্ধ করুন"
          className="grid h-8 w-8 place-items-center rounded-lg text-gray-400 hover:bg-gray-25 hover:text-gray-700 dark:hover:bg-gray-800"
        >
          <HugeiconsIcon icon={Cancel01Icon} size={18} aria-hidden />
        </button>
      </div>

      <AssistantMessages messages={messages} streaming={streaming} />

      <AssistantInput
        value={input}
        onChange={setInput}
        onSend={() => send()}
        disabled={streaming || !input.trim()}
      />
    </motion.div>
  );
}
