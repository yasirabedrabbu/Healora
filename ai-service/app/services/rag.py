"""RAG pipeline (Handoff §8: doctor/hospital recommendation, report info).

pgvector-backed store stub with a clean interface: chunk → embed →
upsert → search. The medical content source is the handoff knowledge
base (sections 4, 8, 10) - no invented claims outside it.
"""
from dataclasses import dataclass, field


@dataclass
class Chunk:
    """A retrievable passage with its source citation."""

    text: str
    source: str  # e.g. "handoff.md#8-ai-assistant"
    embedding: list[float] | None = field(default=None)


class VectorStore:
    """Interface for the vector store; pgvector implementation below."""

    async def upsert(self, chunks: list[Chunk]) -> int:
        raise NotImplementedError

    async def search(self, query_embedding: list[float], top_k: int = 4) -> list[Chunk]:
        raise NotImplementedError


class InMemoryStore(VectorStore):
    """Local fallback (demo/testing). Swap for PgVectorStore in prod."""

    def __init__(self) -> None:
        self._chunks: list[Chunk] = []

    async def upsert(self, chunks: list[Chunk]) -> int:
        self._chunks.extend(chunks)
        return len(chunks)

    async def search(self, query_embedding: list[float], top_k: int = 4) -> list[Chunk]:
        # Cosine similarity without numpy to keep the demo dependency-light.
        def score(c: Chunk) -> float:
            if not c.embedding:
                return 0.0
            num = sum(a * b for a, b in zip(query_embedding, c.embedding))
            den = (
                sum(a * a for a in query_embedding) ** 0.5
                * sum(b * b for b in c.embedding) ** 0.5
            )
            return num / den if den else 0.0

        ranked = sorted(self._chunks, key=score, reverse=True)
        return ranked[:top_k]


async def retrieve(store: VectorStore, query_embedding: list[float], top_k: int = 4) -> list[Chunk]:
    """Fetch the most relevant knowledge-base passages."""
    return await store.search(query_embedding, top_k=top_k)
