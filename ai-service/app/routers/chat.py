"""Chat router — /chat (blocking), /chat/stream (SSE), /chat/history."""
import asyncio
import json
import time

from fastapi import APIRouter, HTTPException
from sse_starlette.sse import EventSourceResponse

from app.models.schemas import ChatRequest, ChatResponse
from app.services.llm import get_provider
from app.services.prompts import build_system_prompt
from app.services.safety import is_emergency, requests_diagnosis, wrap_reply

router = APIRouter()

# Session transcript store. Production swaps this for the Postgres
# ai_sessions/ai_messages tables owned by the Next.js backend.
_TRANSCRIPTS: dict[str, list[dict[str, str]]] = {}


async def _produce_reply(message: str, locale: str) -> tuple[str, bool, bool]:
    """Full safety pipeline: classify → LLM or canned refusal → wrap."""
    emergency = is_emergency(message)
    refused = requests_diagnosis(message)

    if emergency or refused:
        # Short-circuit: no LLM call needed for refusal/emergency paths.
        reply, _, _ = wrap_reply("", emergency, refused)
        return reply, emergency, refused

    provider = get_provider()
    raw = await provider.complete(build_system_prompt(locale), message)
    reply, _, flagged = wrap_reply(raw, emergency=False, refused=False)
    return reply, emergency, flagged


@router.post("", response_model=ChatResponse)
async def chat(req: ChatRequest) -> ChatResponse:
    """Blocking chat endpoint used by the Next.js proxy."""
    try:
        reply, emergency, flagged = await _produce_reply(req.message, req.locale)
    except RuntimeError as exc:
        raise HTTPException(status_code=503, detail=str(exc)) from exc

    _TRANSCRIPTS.setdefault(req.session_id, []).append(
        {"role": "user", "content": req.message, "at": str(time.time())}
    )
    _TRANSCRIPTS[req.session_id].append(
        {"role": "assistant", "content": reply, "at": str(time.time())}
    )

    from app.services.safety import DISCLAIMER_BN

    return ChatResponse(
        reply=reply,
        disclaimer=DISCLAIMER_BN,
        emergency=emergency,
        flagged=flagged,
        session_id=req.session_id,
    )


@router.post("/stream")
async def chat_stream(req: ChatRequest) -> EventSourceResponse:
    """SSE stream — tokens arrive as they generate."""

    async def event_gen():
        reply, emergency, flagged = await _produce_reply(req.message, req.locale)
        # Token-ish chunks: split on words to simulate streaming; the real
        # provider streaming plugs in behind the same protocol.
        for word in reply.split(" "):
            yield {"event": "token", "data": json.dumps({"t": word + " "})}
            await asyncio.sleep(0.01)
        yield {
            "event": "done",
            "data": json.dumps(
                {"emergency": emergency, "flagged": flagged, "session_id": req.session_id}
            ),
        }

    return EventSourceResponse(event_gen())


@router.get("/history/{session_id}")
async def history(session_id: str) -> dict:
    """Transcript for a session (interaction log, safety rule 4)."""
    return {"session_id": session_id, "messages": _TRANSCRIPTS.get(session_id, [])}
