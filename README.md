# Healora - বিশ্বাসের সাথে সুস্থতা

> Trust-first digital healthcare platform for Bangladesh: verified doctors,
> QR-verifiable e-prescriptions, patient-owned records, hospital/lab/pharmacy
> integration, blood community, and a Bangla-first AI health guide.

**Status:** MVP · **Source of truth:** [`docs/HANDOFF-source.md`](docs/HANDOFF-source.md)

---

## What's inside

| Service | Stack | Location | Port |
|---|---|---|---|
| Web app + REST API | Next.js 16 (App Router), TypeScript strict, Prisma 7, Zod | [`web/`](web/) | 3000 |
| AI health assistant | Python FastAPI, Pydantic, SSE streaming, medical-safety layer | [`ai-service/`](ai-service/) | 8000 |
| Database | PostgreSQL (pgvector-ready) | - | 5432 |

## Key principles (non-negotiable)

1. **Medical safety** - the AI never diagnoses, never suggests doses; every
   reply carries a disclaimer; emergencies route to **999 / nearest ER first**
   (`ai-service/app/services/safety.py`).
2. **Trust layer** - BMDC verification before a doctor goes live; HMAC-signed
   one-time QR prescriptions; donors' contact details stay hidden until accept.
3. **Patient-owned data** - records are encrypted, shares are time-limited and
   revocable, every access is logged, admins never see medical content.
4. **Accessibility** - WCAG AA, status = icon + text + colour (never colour
   alone), reduced-motion honoured everywhere.

## Quick start

```bash
# Web + API
cd web && cp .env.example .env && npm install
npx prisma7 migrate dev          # needs PostgreSQL running
node --env-file=.env prisma/seed.ts
npm run dev                      # http://localhost:3000

# AI service
cd ai-service && pip install -r requirements.txt
uvicorn app.main:app --port 8000 # http://localhost:8000/docs
```

Full setup (incl. Prisma 8/7 CLI quirk): **[`docs/RUN.md`](docs/RUN.md)** ·
Deployment: **[`docs/DEPLOY.md`](docs/DEPLOY.md)**

## Quality gates

| Gate | Command | Rule |
|---|---|---|
| Lint | `npx eslint src --max-warnings=0` (in `web/`) | zero warnings |
| Types | `npx tsc --noEmit` (in `web/`) | strict, no `any` |
| Build | `npm run build` (in `web/`) | must pass |
| AI tests | `python -m pytest tests -q` (in `ai-service/`) | all pass |
| Line rule | `node scripts/audit-lines.mjs` (in `web/`) | **≤200 lines/file** |
| Smoke | `npm start` + `node scripts/smoke.mjs` (in `web/`) | all routes 200 + content |

CI runs all gates on every push (`.github/workflows/ci.yml`).

## Docs

- [`docs/API.md`](docs/API.md) - every REST endpoint, auth + safety rules
- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) - system design, data model, flows
- [`docs/RUN.md`](docs/RUN.md) - local setup + Prisma 7/8 notes
- [`docs/DEPLOY.md`](docs/DEPLOY.md) - free-tier deployment guide (Vercel + Neon + Render)
- [`docs/REDESIGN.md`](docs/REDESIGN.md) - UI design system decisions
- [`docs/CONTRIBUTING.md`](docs/CONTRIBUTING.md) - coding standards + PR flow

## Repo layout

```
Healora/
├── web/                  # Next.js app: UI, REST API, Prisma schema
│   ├── prisma/           # schema (24 entities) + seed
│   ├── src/app/api/      # 16 REST routes (Zod → service → JSON)
│   ├── src/components/   # Untitled-UI-token components (≤200 lines each)
│   ├── src/lib/          # db, auth (OTP/JWT), validate, rate-limit, security
│   └── scripts/          # smoke + line audit
├── ai-service/           # FastAPI: safety layer, providers, RAG stub, tests
├── docs/                 # handoff source + all project docs
└── .github/              # CI workflow, issue/PR templates
```

## License

MIT - see [`LICENSE`](LICENSE).
