# Healora API

Two services:

| Service | Stack | Port | Source of truth |
|---|---|---|---|
| Next.js API routes | Next 16 App Router + Prisma 7 + Zod | 3000 | `web/src/app/api/**` |
| AI service | FastAPI + Pydantic | 8000 | `ai-service/` |

Every route: **Zod/Pydantic validate → service/db → JSON response**. Errors are
never stack traces; every response carries `X-Content-Type-Options`,
`X-Frame-Options`, `Referrer-Policy` (`lib/security.ts`).

## Auth (OTP, Handoff §7/§14)

| Method | Path | Body | Notes |
|---|---|---|---|
| POST | `/api/auth/otp/request` | `{phone}` | 5 req / 10 min / IP; dev returns `devCode` |
| POST | `/api/auth/otp/verify` | `{phone, code}` | sets HttpOnly session cookie |
| POST | `/api/auth/logout` | - | clears cookie |
| GET | `/api/auth/me` | - | own profile only |

## Doctors & appointments

| Method | Path | Notes |
|---|---|---|
| GET | `/api/doctors?specialty=&feeMax=&mode=&q=` | only APPROVED, 60 req/min |
| GET | `/api/doctors/[id]` | id or BMDC number |
| POST | `/api/doctors/register` | role-gated, creates PENDING |
| GET | `/api/appointments` | role-aware list |
| POST | `/api/appointments` | `{doctorId, slot, mode}`; verified doctors only |

## Payments (§11)

| Method | Path | Notes |
|---|---|---|
| POST | `/api/payments/init` | creates HOLD for appointment fee |
| POST | `/api/payments/webhook` | `succeeded` → RELEASED, `refunded` → no-show |

## Prescriptions (trust core, §10)

| Method | Path | Notes |
|---|---|---|
| POST | `/api/prescriptions` | doctor-only; HMAC hash + QR token + validity |
| GET | `/api/prescriptions/[id]` | patient (own) or doctor (issued) |
| POST | `/api/prescriptions/[id]/dispense` | one-time; 409 on reuse, 410 on expiry |
| GET | `/api/verify/[token]` | public; re-verifies HMAC, flags forgery (409) |

## Records & access (§9)

| Method | Path | Notes |
|---|---|---|
| GET/POST | `/api/records` | own records; upload URL |
| POST | `/api/records/[id]/share` | owner-only; time-limited grant |
| DELETE | `/api/records/[id]/share/[grant]` | revoke; logged |
| GET | `/api/records/[id]/access-log` | owner-only transparency |

## Hospitals, blood, admin, AI

| Method | Path | Notes |
|---|---|---|
| GET | `/api/hospitals/nearby?lat=&lng=&radiusKm=` | Haversine, ≤50 km |
| GET/PUT | `/api/hospitals/[id]/beds` | public read; HOSPITAL/ADMIN write |
| GET | `/api/blood/donors?group=` | contact hidden until accept (§10) |
| POST | `/api/blood/requests` | 5 req/h |
| GET/POST | `/api/admin/verifications` | ADMIN; metadata only (§9) |
| POST | `/api/ai/chat` | proxies to FastAPI; logs interaction (§8 rule 4) |

## AI service (OpenAPI at `/docs` when running)

| Method | Path | Notes |
|---|---|---|
| GET | `/health` | liveness + disclaimer |
| POST | `/chat` | safety pipeline → disclaimer always attached |
| POST | `/chat/stream` | SSE: `token` events + `done` |
| GET | `/chat/history/{id}` | transcript (rule 4) |

**AI safety layer (`app/services/safety.py`)**: emergency regex (Bangla+English)
→ 999/ER first; diagnosis/dose requests refused (no LLM call); every reply ends
with the disclaimer; provider errors degrade to safe navigation text.
