# Changelog

All notable changes to Healora. Format based on
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/);
versioning: [SemVer](https://semver.org/) (pre-1.0: minor = breaking).

## [0.1.0] - 2026-11-17

### Added - backend
- Prisma 7 schema mirroring Handoff §13 (24 entities) + seed script
- 16 REST routes: OTP auth, doctors (search/detail/register), appointments,
  payments (hold/init/webhook state machine), prescriptions (issue/read/
  one-time dispense), public HMAC verify, records (share/revoke/access-log),
  hospitals (nearby Haversine/beds), blood (donors contact-hidden/requests),
  admin verification queue, AI proxy with interaction logging
- Shared libs: `db` (pg driver adapter), `auth` (HS256 OTP sessions),
  `validate` (Zod), `rate-limit` (sliding window), `security` (headers/errors)
- `.env.example` fully documented

### Added - AI service
- FastAPI app with CORS + `/health` + OpenAPI docs
- Medical safety layer: emergency→999-first, diagnosis/dose refusal,
  mandatory disclaimer, degraded-mode fail-soft
- Provider abstraction (Ollama/OpenAI via `AI_PROVIDER`), §8 system prompt,
  RAG chunk/store stub, SSE `/chat/stream`, `/chat/history`
- pytest suite - 16 tests covering safety, chat, streaming, RAG

### Added - frontend
- All 38 Handoff pages complete (12 built this pass: FAQ, emergency card,
  map, assistant, doctor schedule/earnings, hospital dashboard/queue/beds/
  roster, lab booking/reports, pharmacy orders/dispense, ambulance)
- AssistantWidget (FAB launcher, chat, streaming-ready, reduced-motion safe)
- Per-portal route groups with dedicated navs (patient/doctor/hospital/
  lab/pharmacy/admin)
- Untitled-UI-token redesign pass (docs/REDESIGN.md)

### Added - project
- CI workflow (lint/types/build/pytest), docs suite (API/ARCHITECTURE/RUN/
  DEPLOY/REDESIGN/CONTRIBUTING), SECURITY.md, LICENSE, templates
- Scripts: 39-route smoke test, ≤200-line audit
