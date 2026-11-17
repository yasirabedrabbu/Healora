# Contributing to Healora

Thanks for helping build trust-first healthcare. Medical safety and
accessibility rules are **non-negotiable** — see the HARD rules below.

## Getting started

```bash
git clone <repo-url> && cd Healora
# see docs/RUN.md for full local setup
```

## Branches

- `main` — always deployable; protected by CI
- `feat/<area>-<desc>`, `fix/<area>-<desc>`, `docs/<topic>`

## HARD rules (PRs violating these are rejected)

1. **≤200 lines per file** — split aggressively; one component/resource per folder
2. **TypeScript strict, no `any`**; Python: type hints + docstring on every file
3. **Validate first**: every API route is Zod (web) / Pydantic (AI) → service → response
4. **Named exports** (only Next.js pages/layouts may default-export)
5. **Untitled UI tokens + HugeIcons only** — no shadows, no gradients
6. **Reduced-motion fallback** on every animated surface
7. **Medical copy safety**: disclaimers mandatory, emergency → 999 first,
   AI never diagnoses or suggests doses
8. **No secrets in code** — everything through `.env` (see `.env.example`)

## Before opening a PR

```bash
cd web && npx eslint src --max-warnings=0 && npx tsc --noEmit \
  && node scripts/audit-lines.mjs && npm run build
cd ../ai-service && python -m pytest tests -q
```

## Commit style

Conventional Commits: `feat:`, `fix:`, `docs:`, `refactor:`, `test:`, `chore:`.

## PR checklist

- [ ] CI green (lint, types, build, pytest)
- [ ] Line rule respected (≤200 lines/file)
- [ ] New routes validated + rate-limited + secure headers
- [ ] UI: keyboard reachable, focus visible, reduced-motion safe
- [ ] Medical text reviewed for disclaimer/emergency rules
