# Deploying Healora - free-tier guide

Healora has **two deployables + one database**:

| Piece | Where (free) | Cost |
|---|---|---|
| Web app + REST API (Next.js) | **Vercel Hobby** | $0 |
| PostgreSQL | **Neon** (or Supabase) | $0 |
| FastAPI AI service | **Render free** (or Hugging Face Spaces / Koyeb) | $0 |

Total: **$0/month** to run the full stack live.

---

## 1. PostgreSQL - Neon (free 0.5 GB)

1. Sign up at <https://neon.tech> → **New project** (pick a close region,
   e.g. `Singapore`).
2. Copy the connection string - it looks like:
   `postgresql://user:pass@ep-xxx-pooler.region.aws.neon.tech/healora?sslmode=require`
3. Use the **-pooler** variant for the app (serverless-friendly).

Push the schema + seed:

```bash
cd web
DATABASE_URL="<neon-pooler-url>" node node_modules/@prisma/prisma7/build/prisma7.js migrate deploy
DATABASE_URL="<neon-pooler-url>" node --env-file=.env prisma/seed.ts   # demo data
```

> Free-tier note: Neon auto-suspends after ~5 min idle; first request then
> takes a few seconds ("cold start"). Fine for a demo/MVP.

Alternatives: **Supabase** free (500 MB, includes auth/storage you won't use
yet), **Aiven** free plan.

## 2. Web + API - Vercel (Hobby, free)

1. Push this repo to GitHub.
2. <https://vercel.com> → **Add New Project** → import the repo.
3. Settings: **Root Directory = `web`**, framework auto-detected (Next.js).
4. Environment variables (Project → Settings → Env Vars):

| Key | Value |
|---|---|
| `DATABASE_URL` | Neon **pooler** URL |
| `AUTH_SECRET` | `openssl rand -hex 32` output (long random) |
| `AI_SERVICE_URL` | your Render AI URL (step 3), e.g. `https://healora-ai.onrender.com` |
| `AI_PROVIDER` | `openai` (see note) or `ollama` |
| `AI_API_KEY` | your OpenAI key **only if** `AI_PROVIDER=openai` |
| `NODE_ENV` | `production` |

5. **Deploy.** Every git push redeploys; API routes deploy with the app -
   no separate backend host needed.

> ⚠️ Production OTP: `api/auth/otp/*` currently logs the code and accepts it
> in the sandbox. Before real users: swap in an SMS gateway (e.g. local
> provider APIs) and store hashed single-use codes - the flow shape is ready.

## 3. AI service - Render (free web service)

**Option A - Render (simplest):**

1. <https://render.com> → **New → Web Service** → connect the GitHub repo.
2. Settings: **Root Directory = `ai-service`**, **Runtime = Docker**
   (uses `ai-service/Dockerfile`), Instance type **Free**.
3. Environment variables:

| Key | Value |
|---|---|
| `AI_PROVIDER` | `openai` |
| `AI_API_KEY` | your OpenAI key |
| `AI_MODEL` | `gpt-4o-mini` |

4. Deploy → copy the URL `https://<name>.onrender.com` → put it in Vercel's
   `AI_SERVICE_URL`. Test: `GET /health` should return the disclaimer JSON.

Free-tier note: Render free spins down after 15 min idle (~50 s cold start).
Frontend already fails soft ("AI সার্ভিস এখন পাওয়া যাচ্ছে না").

**Option B - Hugging Face Spaces (free, no cold sleep):**

1. Create a **Docker Space** → upload `ai-service/` contents.
2. Space reads the same Dockerfile; set `AI_PROVIDER`/`AI_API_KEY` in
   Space settings (Secrets). Keep the repo **private** if a key is set.
3. Use the Space URL as `AI_SERVICE_URL`.

**Option C - Koyeb free:** similar Docker flow, always-on free instance.

> **Why not Ollama in prod?** Free tiers can't run a local LLM (no long-lived
> process/GPU). Keep Ollama for local dev only; in the cloud use
> `AI_PROVIDER=openai` (cheapest: gpt-4o-mini) - or leave the provider
> unreachable and the service answers in safe degraded mode with the
> disclaimer intact (no key needed, zero cost).

## 4. Custom domain (optional)

- Domain: ~$10/yr (Namecheap/Cloudflare) - this is the only thing not free.
- Vercel: Project → Domains → add. Render: Settings → Custom Domains.
- HTTPS certificates are automatic on both.

## 5. Post-deploy checklist

```bash
curl https://<web>.vercel.app/                        # homepage 200
curl https://<ai>.onrender.com/health                 # disclaimer JSON
curl https://<web>.vercel.app/api/doctors             # seeded doctors
node scripts/smoke.mjs https://<web>.vercel.app       # 39/39
```

Then verify manually: OTP login (dev echo in sandbox), doctor register →
admin approve → appears in search, book appointment → payment HOLD →
prescription → QR verify → pharmacy dispense (one-time) → records share/revoke.

## What's deliberately NOT in free hosting (production TODO)

| Gap | Fix when real users |
|---|---|
| OTP = console/echo | SMS gateway (§15) + hashed single-use codes |
| Payments = sandbox | SSLCommerz/bKash live keys (§11) |
| Files = local `/uploads` | S3-compatible (R2 free tier / Supabase storage) |
| Rate limit = in-memory | Upstash Redis (free) - same call-site API |
| WebSocket queue/map tiles | Vercel limits long WS - Supabase Realtime or separate node |
