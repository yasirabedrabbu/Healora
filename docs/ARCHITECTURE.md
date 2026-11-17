# Healora Architecture

```
                       ┌──────────────────────────────────────┐
   Browser ───────────▶│  Next.js 16 (Vercel / Node)          │
                       │  ├─ 38 pages (App Router, portals)   │
                       │  ├─ 16 REST routes (Zod validated)   │
                       │  └─ Prisma 7 ──────────────┐         │
                       └───────────────┬────────────┼─────────┘
                                       │ /chat proxy│
                                       ▼            ▼
                       ┌──────────────────────┐  ┌─────────────┐
                       │ FastAPI AI (Render)  │  │ PostgreSQL  │
                       │ safety layer         │  │ (Neon)      │
                       │ LLM provider (env)   │  │ pgvector    │
                       │ SSE streaming        │  └─────────────┘
                       └──────────────────────┘
```

## Request flow (every route)

```
Request → rate limit → Zod/Pydantic validate → service/DB → secure headers JSON
```

Errors: thrown `Error & { status }` caught by `handleRoute` - clean messages,
never stack traces.

## Data model (24 entities - Handoff §13)

Identity: `User` (phone-first, role enum) · `Doctor` + `DoctorDocument` (BMDC verification)
Facilities: `Hospital`/`HospitalBed` · `Lab` · `Pharmacy` (license/DGDA numbers)
Core flow: `Appointment` → `Consultation` → `Prescription`(+items, HMAC hash +
one-time QR token + validity) · `Payment` (HOLD→RELEASED/REFUNDED)
Ownership: `MedicalRecord` · `RecordShare` (time-limited, revocable) · `AccessLog`
Community: `BloodDonor` · `BloodRequest` · `Review` · `Report` · `AuditLog`
AI: `AiSession` · `AiMessage` (flagged) · `Schedule`

## Medical safety pipeline (ai-service)

```
message → emergency regex (bn+en) ──yes──▶ 999/ER reply + disclaimer
        → diagnosis/dose regex ──yes──▶ refusal (no LLM call) + disclaimer
        → LLM (provider abstraction, fail-soft) → reply + disclaimer footer
```

Rules (Handoff §8): never diagnose; never suggest medicines/doses; no
identifiable data upstream; every interaction logged; disclaimer mandatory.

## Trust mechanics

- **Doctors** go live only after admin APPROVED (§10) - search exposes approved only
- **Prescriptions** are HMAC-signed; public `/verify/[token]` re-derives the hash
  (mismatch = forgery → 409); dispense is single-use (409 on reuse, 410 expired)
- **Records** are owner-only; shares expire + revoke; every touch logged
- **Blood** donors' contacts hidden until accept; requests rate-limited 5/h

## Auth

OTP-first (§7): phone → 6-digit code (dev logs + echoes; prod SMS gateway)
→ HS256 session in HttpOnly cookie (`healora_session`, 7d). `requireRole`
guards portals; admin restricted to metadata-only views (§9).

## Frontend structure

Route groups per portal (each with its own layout + nav):
`(marketing)` · `(auth)` · `(dashboard)` with nested `doctor/` `hospital/`
`lab/` `pharmacy/` `admin/` · `verify/[token]` standalone.

Design system: Untitled UI tokens, HugeIcons, no shadows/gradients,
Framer Motion with reduced-motion fallbacks everywhere (see docs/REDESIGN.md).
