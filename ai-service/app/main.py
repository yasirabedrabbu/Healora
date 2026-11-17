"""FastAPI application entrypoint (Handoff §8).

CORS for the Next.js frontend, health endpoint, chat router.
Run: uvicorn app.main:app --port 8000
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import chat
from app.services.safety import DISCLAIMER_BN


def create_app() -> FastAPI:
    """App factory with middleware and routers wired."""
    app = FastAPI(
        title="Healora AI Assistant",
        version="0.1.0",
        description=(
            "Bangla-first health guidance. Triage and navigation only - "
            "never diagnosis. Every answer carries the medical disclaimer."
        ),
    )
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["http://localhost:3000"],
        allow_methods=["GET", "POST"],
        allow_headers=["Content-Type"],
    )
    app.include_router(chat.router, prefix="/chat", tags=["chat"])

    @app.get("/health")
    def health() -> dict[str, str]:
        """Liveness probe for orchestration."""
        return {"status": "ok", "service": "healora-ai", "disclaimer": DISCLAIMER_BN}

    return app


app = create_app()
