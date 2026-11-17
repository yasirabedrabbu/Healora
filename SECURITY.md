# Security Policy

Healora handles sensitive medical data. Reporting channels and handling rules:

## Reporting a vulnerability

**Do not open a public issue for security reports.**

- Email: security@healora.example *(placeholder — set a real inbox before launch)*
- Include: affected route/file, reproduction steps, impact assessment
- Response target: 72 hours acknowledgement, 7 days fix-or-mitigation

## Scope highlights (bug-bounty-relevant)

| Area | Expected invariant |
|---|---|
| `api/auth/*` | OTP flow cannot be bypassed; session cookie is HttpOnly + SameSite |
| `api/prescriptions` | Issuable only by APPROVED doctors; hash forgery detected at `/api/verify` |
| `api/prescriptions/[id]/dispense` | Strictly one-time; 409 on reuse, 410 on expiry |
| `api/records/*` | Owner-only share/revoke/log; admin cannot read medical content |
| `api/blood/*` | Donor contact hidden until accept (scam-protection rule) |
| `ai-service` | No diagnosis/dose advice; no identity forwarded upstream; disclaimer always |

## Controls in place

- Zod/Pydantic validation on every route; errors never leak stacks
- Rate limiting (`lib/rate-limit.ts`) on OTP, AI, booking, blood requests
- Secure headers (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`)
- HMAC-signed prescriptions + audit log on sensitive actions
- Secrets via env only; `.env.example` documents every variable
