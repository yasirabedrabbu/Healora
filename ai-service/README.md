"""Healora AI service — Python FastAPI.

Bangla-first health guidance with a hard medical-safety layer:
emergency → 999/ER first, diagnosis/dose refusal, mandatory disclaimer.

## Local run

    pip install -r requirements.txt
    uvicorn app.main:app --reload --port 8000
    # OpenAPI docs: http://localhost:8000/docs

## Tests

    python -m pytest tests -q     # 16 tests (safety, chat, streaming, RAG)

## Provider

AI_PROVIDER=ollama (default, local, data never leaves) | openai (AI_API_KEY).
No provider reachable → safe degraded mode, disclaimer intact.

## Deploy

Docker (Render / Railway / HF Spaces / Koyeb) — see ../docs/DEPLOY.md.
"""
