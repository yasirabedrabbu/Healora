"use client";

import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { useReducedMotion } from "@/lib/useReducedMotion";
import type { ChatMessage } from "./useChat";

/** Scrollable transcript with typed bubbles + emergency emphasis. */
export function AssistantMessages({
  messages,
  streaming,
}: {
  messages: ChatMessage[];
  streaming: boolean;
}) {
  const endRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
  }, [messages, streaming, reduce]);

  return (
    <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4" aria-live="polite">
      {messages.map((m) => (
        <motion.div
          key={m.id}
          initial={reduce ? undefined : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
          className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
            m.role === "user"
              ? "ml-auto bg-brand-500 text-white"
              : m.emergency
                ? "border border-error-300 bg-error-50 text-error-900 dark:border-error-700/50 dark:bg-error-700/10 dark:text-error-200"
                : "bg-gray-25 text-gray-800 dark:bg-gray-800 dark:text-gray-100"
          }`}
        >
          {m.content}
        </motion.div>
      ))}
      {streaming && (
        <div className="flex gap-1.5 px-2" aria-hidden>
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              animate={reduce ? undefined : { opacity: [0.3, 1, 0.3] }}
              transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
              className="h-2 w-2 rounded-full bg-brand-300"
            />
          ))}
        </div>
      )}
      <div ref={endRef} />
    </div>
  );
}
