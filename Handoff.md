# Healora

> Bishwasher shathe shushthota. Bangladesh-er trust-first digital healthcare platform.

**Status:** Concept / Pre-MVP
**Owner:** [tomar naam]
**Last updated:** 2026-11-16

---

## 1. Problem

- Fake doctor, prescription forgery, prescription reuse, unverified medicine packet.
- Hospital-e line-e ghonta bose thaka, bed/ICU-r tothyo nei.
- Blood donation mostly informal, broker-driven, unverified donor.
- Patient-er report, prescription, history chhariye thake.
- Competitor (Doctorola, Praava, Arogga, Shohoj Health, Tonic, ePharma) onek service dey, kintu trust layer ar integrated flow kom.

## 2. Solution

Ek platform-e:
- Verified doctor booking (video/audio/chat/chamber)
- QR-verifiable e-prescription
- Patient-owned medical record with access log
- Hospital/lab/pharmacy integration
- Blood donation community
- Map-based hospital, bed, ambulance finder
- Bangla-first AI assistant (triage, recommendation, OCR, report summary)

## 3. Target users

| Role | Ki kore |
|---|---|
| Patient | Doctor khoje, booking, record, medicine, blood request |
| Doctor | Schedule, e-prescription, patient list, earnings |
| Hospital | Serial, bed status, doctor roster, lab/ambulance |
| Lab/Diagnostic | Test booking, sample collection, report upload |
| Pharmacy | Order accept, dispense mark, stock |
| Blood donor/requester | Donor register, urgent request, certificate |
| Ambulance | Booking, availability |
| Admin (Healora team) | Verification, payment, scam report, analytics |

## 4. Core principles

1. **Trust first:** Verified doctor, verified prescription, verified hospital.
2. **Patient owns data:** Patient decides who can see what. Access log thake.
3. **Bangla-first, low-bandwidth:** Video na challe audio/chat fallback.
4. **No diagnosis by AI:** AI shudhu guidance dey, final decision doctor-er.
5. **Emergency first:** Emergency detect hole 999/nikoter ER dekhano.

## 5. Features

### Phase 1: MVP (pilot)
- OTP login (phone/email)
- Doctor registration + verification (BMDC no., NID, selfie, certificate, manual admin approve)
- Doctor search (specialty, fee, location, language, availability)
- Doctor profile (verified badge)
- Booking (video, audio, chat, chamber)
- Payment (bKash/Nagad/card, sandbox first)
- Video/audio consult (WebRTC/Jitsi/LiveKit), recording off by default
- E-prescription builder (template, favourite medicine, copy from old)
- QR prescription + verify page (doctor, reg no., date, medicine)
- Prescription hash + validity date + "dispensed" mark
- Patient record (upload, view, share with time limit)
- Access log
- Doctor dashboard (queue, schedule, earnings)
- Admin dashboard (verification queue, payment, report)
- Phone number masking in chat
- Bangla + English UI

### Phase 2: Hospital + Map
- Hospital onboarding + dashboard
- Doctor roster + shift
- Online serial + live queue
- Bed/ICU/oxygen status (last updated timestamp)
- Map view (hospital, chamber, lab, pharmacy, blood bank layers)
- "Nearest emergency" button
- Filter (specialty, open now, ICU, 24/7)
- Lab/diagnostic booking + report upload
- Test price comparison

### Phase 3: Blood donation + Patient extras
- Donor register (verified tag, last donation date, gap tracking)
- Urgent blood request (blood group + area)
- Hospital/requester verification
- Donor certificate + badge
- Licensed blood bank list
- Family profile
- Medicine reminder, follow-up reminder (SMS/WhatsApp)
- Vaccine tracker
- Chronic care tracker (sugar, BP log, graph)
- Emergency card (blood group, allergy, QR lock-screen)

### Phase 4: Pharmacy + Ambulance + AI
- Partner pharmacy order + delivery
- Generic medicine alternative
- Ambulance booking + live status
- AI assistant (see section 8)
- Home care booking (nurse, physio, caregiver)
- Health package booking

### Phase 5: Scale
- Mobile app (React Native / PWA)
- Insurance + claim help
- Corporate health package
- Referral network
- Analytics for hospitals

## 6. Pages (overview)

| Area | Approx pages | Notes |
|---|---|---|
| Public/marketing | ~15 | Home, about, pricing, FAQ, privacy, terms, contact |
| Auth/onboarding | ~8 | Login, OTP, role select, profile setup |
| Patient | ~45 | Dynamic route use korbe (`/doctors/[id]`) |
| Doctor | ~25 | Dashboard + prescription |
| Hospital | ~25 | Dashboard + queue + bed |
| Lab | ~12 | |
| Pharmacy | ~10 | |
| Blood | ~12 | |
| Ambulance | ~8 | |
| Admin | ~20 | |
| Map | ~5 | |

**Phase 1 target:** ~25-30 page.

## 7. Tech stack

| Layer | Tool |
|---|---|
| Frontend | Next.js (TypeScript) + Tailwind CSS + shadcn/ui |
| Backend | FastAPI (Python) |
| Database | PostgreSQL + PostGIS + pgvector |
| ORM/migration | SQLAlchemy/SQLModel + Alembic |
| Cache/queue | Redis + Celery (or ARQ) |
| Real-time | WebSocket |
| Auth | JWT + OTP |
| Storage | S3-compatible (MinIO / Cloudflare R2) |
| Map | MapLibre GL + OpenStreetMap / MapTiler free tier |
| Video | Jitsi Meet or LiveKit |
| Push | Firebase Cloud Messaging |
| SMS/OTP | Provider check korte hobe (BD SMS sasta) |
| Payment | SSLCommerz / aamarPay / shurjoPay (sandbox first) |
| QR | `qrcode` library |
| PDF | WeasyPrint / pdf-lib |
| Deploy | Docker, Vercel (frontend), BD-te hosting (patient data) |

## 8. AI assistant

| Feature | Rule |
|---|---|
| Symptom triage | "Kon specialty-r doctor dekhbe" bole. Diagnosis na. |
| Doctor/hospital recommendation | Location, fee, language diye match |
| Booking via chat | Step-by-step guide |
| Bangla chat + voice | Phase 4 |
| Prescription OCR | Doctor verify korbe |
| Report summary | Doctor-er bikolpo na, shudhu explanation |
| Medicine info | General info, dose shomporke doctor |
| Emergency detect | Shathe shathe 999/ER |

**AI safety rules**
1. Prottek uttore disclaimer.
2. Emergency hole AI age 999/ER bolbe.
3. Identifiable patient data (naam, phone, record) bidesh-e API-te pathabe na. Anonymize ba consent.
4. AI interaction log rakhbe.
5. Medicine/dose-er uttor doctor prescription-er bodole nirbhor kora jabe na.

## 9. Data, privacy, legal

**Access matrix**

| Role | Dekhte pare |
|---|---|
| Patient | Nijer sob record |
| Doctor | Patient share kora, time-limited, revoke-able, consultation-er jonno |
| Hospital/Lab | Booking-er jonno dorkari info only |
| Pharmacy | Prescription-er medicine list only |
| Admin | Medical content na. Account, payment, verification metadata only. |

**Compliance checklist (lawyer diye verify korte hobe)**
- Personal Data Protection Ordinance 2025 (gazette 6 Nov 2025, compliance window ~May 2027). Health data = sensitive, alada consent.
- National Data Governance Ordinance 2025: "confidential/restricted" data Bangladesh-e store.
- DGDA: online pharmacy-te physical registered pharmacy partner lagbe.
- BMDC telemedicine guideline: kon medicine prescribe kora jabe, kon medium. Feature design-er age check.
- E-commerce rules: medicine sale-er approval.
- Payment: escrow/split settlement payment licence-er proshno. Lawyer-er shathe check.
- Company registration, trade licence, TIN.

**Disclaimer:** Ami lawyer na. Eta research summary. Investor-er age health-tech lawyer diye review korte hobe.

## 10. Scam protection

- Doctor: BMDC + NID + selfie + manual approve, verified badge shudhu approve-er por.
- Prescription: unique ID + QR, hash, validity date, "dispensed" mark (dwitiyo bar use hobe na).
- Chat: phone mask, baire payment warning.
- Blood: OTP, hospital/reference verify, donor contact accept-er age hidden, report button.
- Patient-ke shikkha: "OTP/password keu chaibe na", "baire payment korbe na".

## 11. Payment model

| Flow | Detail |
|---|---|
| Patient pays | bKash/Nagad/card via gateway |
| Hold | Taka platform-er kache thake |
| Release | Consultation shesh hole doctor-er balance-e, commission kete |
| No-show | Auto refund |

| Income | Kivabe |
|---|---|
| Consultation commission | Prottek paid consult-er % (tomar decide) |
| Doctor subscription | Featured listing, extra tools |
| Hospital/lab booking | Referral fee ba booking fee |
| Pharmacy | Commission + delivery fee |
| Blood donation | Free (trust-er jonno) |

## 12. Design system

- **Heading font:** Clash Display (English), Anek Bangla (Bangla)
- **Body font:** Satoshi (English), Hind Siliguri (Bangla)
- **Primary:** Deep Teal `#0B7A75`
- **Secondary:** Trust Blue `#1A4FC4`
- **Text:** Ink `#0D1117`, Slate `#5B6675`
- **Background:** Cloud `#F6F8F9`, White `#FFFFFF`
- **Border:** `#E3E8EC`
- **Success:** `#1E9E5A` | **Warning:** `#E0A100` | **Danger:** `#D93A3A`
- **Blood:** `#C8283C`
- Status-e icon + text + colour (colour-blind-friendly)
- Body text min 16px, Bangla line height 1.6-1.8
- Contrast WCAG check korte hobe

**Font licence:** Fontshare theke commercial use check korte hobe.

## 13. Data model (draft)

```
users (id, phone, email, role, created_at)
doctors (id, user_id, bmdc_no, specialty, fee, languages, verified_status)
doctor_documents (id, doctor_id, type, file_url, status)
hospitals (id, name, address, geo, license_no, verified_status)
hospital_beds (id, hospital_id, type, total, available, updated_at)
labs (id, name, geo, license_no, verified_status)
pharmacies (id, name, geo, dgda_no, verified_status)
appointments (id, patient_id, doctor_id, slot, mode, status, payment_id)
consultations (id, appointment_id, started_at, ended_at, notes)
prescriptions (id, consultation_id, doctor_id, patient_id, hash, qr_code, valid_until, status)
prescription_items (id, prescription_id, medicine_id, dose, duration)
medicines (id, brand_name, generic_name, strength, form)
medical_records (id, patient_id, type, file_url, encrypted)
record_shares (id, record_id, grantee_id, expires_at, revoked_at)
access_logs (id, record_id, accessed_by, accessed_at, action)
payments (id, appointment_id, amount, gateway, status, released_at)
blood_donors (id, user_id, blood_group, area_geo, last_donated_at, verified)
blood_requests (id, requester_id, blood_group, hospital_id, urgency, status)
reviews (id, appointment_id, rating, text, verified)
reports (id, reporter_id, target_type, target_id, reason, status)
audit_logs (id, actor_id, action, target, created_at)
```

## 14. API (draft)

```
POST   /auth/otp/request
POST   /auth/otp/verify
GET    /doctors?specialty=&area=&fee_max=
GET    /doctors/{id}
POST   /doctors/register
POST   /appointments
POST   /payments/init
POST   /payments/webhook
POST   /prescriptions
GET    /prescriptions/{id}
GET    /verify/{qr_token}          # public verify page
POST   /prescriptions/{id}/dispense
GET    /records
POST   /records/{id}/share
DELETE /records/{id}/share/{grant}
GET    /records/{id}/access-log
GET    /hospitals/nearby?lat=&lng=&radius=
PUT    /hospitals/{id}/beds
GET    /blood/donors?group=&area=
POST   /blood/requests
POST   /ai/chat
ws     /ws/consult/{id}
ws     /ws/queue/{hospital_id}
```

## 15. Free / low-cost tools

| Need | Option | Note |
|---|---|---|
| Hosting (demo) | Vercel, Render, Railway | Patient data BD-te move korte hobe |
| DB | Supabase / self-host Postgres | Real data-r jonno BD hosting |
| Map | MapLibre + OSM | Tile usage limit |
| Video | Jitsi | Free |
| Push | FCM | Free |
| SMS | Provider compare | BD-te free SMS nei |
| Payment | Sandbox | Live-e fee |
| Medicine DB | License ba nijer toiri | Scrape korbe na |

## 16. Roadmap

| Month | Milestone |
|---|---|
| 1 | Design system, sitemap, DB schema, lawyer consultation |
| 2-3 | Phase 1 build |
| 4 | 10-20 doctor pilot |
| 5 | Feedback, fix, payment live |
| 6 | Phase 2 start (hospital), investor pitch |

*Timeline assumption: solo/small team. Tomar team size onujayi change hobe.*

## 17. Success metrics

| Metric | Target (first 6 months) |
|---|---|
| Verified doctor | 20-50 |
| Monthly prescription issued | 500+ |
| Doctor weekly active | 60%+ |
| Patient repeat booking | 30%+ |
| Testimonial | 3-5 |

## 18. Risks

| Risk | Mitigation |
|---|---|
| Doctor onboarding slow | Free tool + pilot doctor-er referral |
| Legal (data, payment, prescription) | Lawyer review before launch |
| Trust low | Verified badge, transparent process, real reviews |
| Competitor copy | Trust network, hospital partnership |
| Bad AI advice | Strict rules, disclaimer, doctor review |
| Scam/fake doctor | Manual verification, report system |
| Bandwidth/digital literacy | Low-bandwidth mode, Bangla UI, phone support |
| Cost (SMS, hosting) | Phased rollout, pricing model |

## 19. Open questions

- [ ] Healora naam trademark/domain check
- [ ] Company registration type
- [ ] Payment gateway choice
- [ ] Pilot doctor list
- [ ] Hospital partner list
- [ ] Lawyer engagement
- [ ] Team (tech, medical advisor, operations)
- [ ] Funding ask amount

## 20. Team (needed)

| Role | Note |
|---|---|
| Founder/CEO | Vision, investor |
| Medical advisor (BMDC doctor) | Prescription, content, verification |
| Full-stack dev (Python + Next.js) | Product |
| Designer | Brand, UI |
| Operations | Doctor onboarding, support |
| Legal advisor | Compliance |

## 21. Next steps

1. Lawyer-er shathe 1 meeting
2. 10 patient + 5 doctor interview
3. Sitemap + DB schema final
4. Design system (Figma / tokens)
5. Phase 1 build
6. Pilot launch