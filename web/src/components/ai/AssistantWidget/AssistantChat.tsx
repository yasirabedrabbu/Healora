"use client";

import { AssistantMessages } from "./AssistantMessages";
import { AssistantInput } from "./AssistantInput";
import { useChat } from "./useChat";

/** Inline full-page variant of the chat for /assistant. */
export function AssistantChat() {
  const { messages, streaming, send, input, setInput } = useChat();

  return (
    <>
      <AssistantMessages messages={messages} streaming={streaming} />
      <AssistantInput value={input} onChange={setInput} onSend={() => send()} disabled={streaming || !input.trim()} />
    </>
  );
}
