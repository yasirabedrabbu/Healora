# Healora web - Next.js 16 app + REST API

See the [root README](../README.md) for the full project.

## Commands

```bash
npm install
cp .env.example .env                  # fill DATABASE_URL + AUTH_SECRET
npx prisma7 generate                  # Prisma 7 CLI (see docs/RUN.md for the 8/7 quirk)
npx prisma7 migrate dev               # needs PostgreSQL
node --env-file=.env prisma/seed.ts   # demo data
npm run dev                           # http://localhost:3000
```

## Quality gates

```bash
npx eslint src --max-warnings=0
npx tsc --noEmit
npm run build
node scripts/audit-lines.mjs          # ≤200 lines per file
npm start & node scripts/smoke.mjs    # 39-route smoke test
```

## Layout

- `prisma/` - schema (24 entities, Handoff §13) + seed
- `src/app/api/` - 16 REST routes, each: rate-limit → Zod → service → JSON
- `src/app/(dashboard)/` - patient portal + nested doctor/hospital/lab/pharmacy/admin portals
- `src/lib/` - db (pg adapter), auth (OTP HS256 sessions), validate, rate-limit, security
- `scripts/` - smoke + line audit

Hard rules live in [`docs/CONTRIBUTING.md`](../docs/CONTRIBUTING.md) - ≤200
lines/file, no `any`, Untitled UI tokens + HugeIcons only, no shadows/gradients,
reduced-motion fallbacks, medical disclaimers + 999-first copy.
