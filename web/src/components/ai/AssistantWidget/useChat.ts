"use client";

import { useRef, useState, useCallback } from "react";

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  emergency?: boolean;
};

/**
 * Chat state + POST /api/ai/chat transport. Streaming upgrade: swap the
 * fetch for an SSE reader against /chat/stream - the protocol is ready.
 */
export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "স্বাস্থ্য নিয়ে প্রশ্ন করুন - আমি বলব কোন স্পেশালিটির ডাক্তার দেখা উচিত। রোগ নির্ণয় করি না।",
    },
  ]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const sessionId = useRef(crypto.randomUUID());

  const send = useCallback(async () => {
    const text = input.trim();
    if (!text) return;
    setInput("");
    setMessages((prev) => [...prev, { id: `u-${Date.now()}`, role: "user", content: text }]);
    setStreaming(true);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId: sessionId.current, message: text }),
      });
      const data = (await res.json()) as {
        reply: string;
        emergency: boolean;
        sessionId: string;
      };
      setMessages((prev) => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          role: "assistant",
          content: data.reply,
          emergency: data.emergency,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          role: "assistant",
          content: "সংযোগ সমস্যা - একটু পরে আবার চেষ্টা করুন।",
        },
      ]);
    } finally {
      setStreaming(false);
    }
  }, [input]);

  return { messages, streaming, send, input, setInput };
}
