"""LLM provider abstraction (Handoff §8 + prompt: never hardcode keys).

AI_PROVIDER env var selects: openai | anthropic | ollama.
All providers implement the same `complete` contract so the safety
layer stays provider-agnostic.
"""
import os
from typing import Protocol

import httpx


class LLMProvider(Protocol):
    """Contract every provider fulfils."""

    async def complete(self, system: str, user: str) -> str: ...


class OllamaProvider:
    """Local Ollama - the default for the demo (no key, no data leaves)."""

    def __init__(self, model: str | None = None) -> None:
        self.model = model or os.getenv("AI_MODEL", "llama3.1:8b")
        self.base = os.getenv("OLLAMA_URL", "http://localhost:11434")

    async def complete(self, system: str, user: str) -> str:
        async with httpx.AsyncClient(timeout=30) as client:
            resp = await client.post(
                f"{self.base}/api/generate",
                json={
                    "model": self.model,
                    "system": system,
                    "prompt": user,
                    "stream": False,
                },
            )
            resp.raise_for_status()
            data = resp.json()
            return str(data.get("response", ""))


class OpenAIProvider:
    """Hosted fallback. Key comes from env only (AI_API_KEY)."""

    def __init__(self, model: str | None = None) -> None:
        self.model = model or os.getenv("AI_MODEL", "gpt-4o-mini")
        self.key = os.getenv("AI_API_KEY", "")
        if not self.key:
            raise RuntimeError("AI_API_KEY missing for openai provider")

    async def complete(self, system: str, user: str) -> str:
        async with httpx.AsyncClient(timeout=30) as client:
            resp = await client.post(
                "https://api.openai.com/v1/chat/completions",
                headers={"Authorization": f"Bearer {self.key}"},
                json={
                    "model": self.model,
                    "messages": [
                        {"role": "system", "content": system},
                        {"role": "user", "content": user},
                    ],
                },
            )
            resp.raise_for_status()
            data = resp.json()
            return str(data["choices"][0]["message"]["content"])


def get_provider() -> LLMProvider:
    """Factory from AI_PROVIDER env; defaults to local Ollama."""
    name = os.getenv("AI_PROVIDER", "ollama").lower()
    if name == "openai":
        return OpenAIProvider()
    return OllamaProvider()
