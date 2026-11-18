# Backend delivery roadmap

This project must not advertise a feature as live until its dashboard flow,
API, database persistence, authorization, and user-facing failure state exist.

## Phase 1: account preferences and in-app notifications

- Persist user profile, privacy, locale and notification preferences.
- Store in-app notifications and allow users to mark them read.
- Keep SMS/email delivery disabled until a provider is configured.

## Phase 2: appointment lifecycle

- Doctor schedules and bookable slots.
- Slot conflict prevention, cancel/reschedule and no-show handling.
- Appointment notifications, payment hold/release/refund transitions.

## Phase 3: records and care coordination

- Object-storage upload, signed downloads, scanning and retention rules.
- Family profiles, delegated record consent and access audit.
- Lab bookings, reports and pharmacy order/dispense workflows.

## Phase 4: external integrations

- SMS OTP and reminders through a configured provider.
- bKash/Nagad/card checkout and verified webhook handling.
- Provider-neutral email/push dispatcher and delivery logs.

## Phase 5: realtime consultations

- WebSocket/SSE event layer for queues and in-app messaging.
- Chat persistence and moderation/audit rules.
- WebRTC signaling plus TURN credentials for audio/video calls.

## Required release gates

- Route authorization and validation tests.
- Migrations applied against a staging database before production.
- No mock-success toast remains for a claimed live feature.
- Emergency paths always show 999 first and never depend on a third party.
