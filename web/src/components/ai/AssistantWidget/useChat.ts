"use client";

import { useCallback, useMemo, useState } from "react";
import { useI18n } from "@/lib/i18n";

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  emergency?: boolean;
};

/** crypto.randomUUID is undefined on http://LAN-IP (insecure context) - never crash on it. */
const uid = (): string =>
  globalThis.crypto?.randomUUID?.() ??
  `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;

type ChatReply = { reply?: string; emergency?: boolean };

export function useChat() {
  const { t } = useI18n();
  const [history, setHistory] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [sessionId] = useState(uid);

  // Welcome is derived (not stored) so it follows the language toggle.
  const messages = useMemo<ChatMessage[]>(
    () => [{ id: "welcome", role: "assistant", content: t.ui.assistantWelcome }, ...history],
    [history, t.ui.assistantWelcome]
  );

  const push = useCallback((m: Omit<ChatMessage, "id">) => {
    setHistory((prev) => [...prev, { id: uid(), ...m }]);
  }, []);

  const send = useCallback(async () => {
    const text = input.trim();
    if (!text || streaming) return;
    setInput("");
    push({ role: "user", content: text });
    setStreaming(true);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, message: text }),
      });

      if (res.status === 429) {
        push({ role: "assistant", content: t.ui.assistantBusy });
        return;
      }
      const data = (await res.json().catch(() => null)) as ChatReply | null;
      if (!res.ok || !data?.reply) {
        push({ role: "assistant", content: t.ui.assistantError });
        return;
      }
      push({ role: "assistant", content: data.reply, emergency: data.emergency });
    } catch {
      push({ role: "assistant", content: t.ui.assistantError });
    } finally {
      setStreaming(false);
    }
  }, [input, streaming, sessionId, push, t.ui.assistantBusy, t.ui.assistantError]);

  return { messages, streaming, send, input, setInput };
}