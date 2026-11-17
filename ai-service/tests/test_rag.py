"""RAG store tests - chunk store + cosine retrieval."""
from app.services.rag import Chunk, InMemoryStore, retrieve


def _vec(base: float, size: int = 8) -> list[float]:
    """Deterministic test vector."""
    return [base] * size


async def test_upsert_and_search_finds_relevant_chunk() -> None:
    store = InMemoryStore()
    chunks = [
        Chunk(text="QR প্রেসক্রিপশন একবারই ব্যবহারযোগ্য", source="handoff#10", embedding=_vec(1.0)),
        Chunk(text="রক্তদান সবসময় ফ্রি", source="handoff#11", embedding=_vec(0.2)),
    ]
    assert await store.upsert(chunks) == 2

    hits = await retrieve(store, _vec(0.95), top_k=1)
    assert hits[0].text.startswith("QR প্রেসক্রিপশন")


async def test_search_empty_store_returns_empty() -> None:
    store = InMemoryStore()
    assert await retrieve(store, _vec(0.5)) == []


async def test_top_k_respected() -> None:
    store = InMemoryStore()
    await store.upsert([Chunk(text=f"c{i}", source="s", embedding=_vec(0.1 * i)) for i in range(5)])
    hits = await retrieve(store, _vec(0.5), top_k=2)
    assert len(hits) == 2
