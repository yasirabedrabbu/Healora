"""Pydantic request/response models for the AI service."""
from typing import Literal

from pydantic import BaseModel, ConfigDict, Field


class ChatRequest(BaseModel):
    """Inbound chat turn. No identity fields by design (safety rule 3).

    Accepts both camelCase (Next.js proxy) and snake_case (tests/curl):
    FastAPI/Pydantic populate_by_name + sessionId alias.
    """

    model_config = ConfigDict(populate_by_name=True)

    session_id: str = Field(min_length=1, max_length=64, alias="sessionId")
    message: str = Field(min_length=1, max_length=2000)
    locale: Literal["bn", "en"] = "bn"


class ChatResponse(BaseModel):
    """Outbound reply with the mandatory disclaimer (safety rule 1)."""

    reply: str
    disclaimer: str
    emergency: bool
    flagged: bool
    session_id: str


class HistoryMessage(BaseModel):
    """A stored turn for /chat/history."""

    role: Literal["user", "assistant"]
    content: str
    created_at: str


class HistoryResponse(BaseModel):
    """Session transcript."""

    session_id: str
    messages: list[HistoryMessage]


class EmbedRequest(BaseModel):
    """Text to embed for the RAG pipeline."""

    texts: list[str] = Field(min_length=1, max_length=64)


class EmbedResponse(BaseModel):
    """Vector embeddings aligned with the input order."""

    embeddings: list[list[float]]
    model: str
