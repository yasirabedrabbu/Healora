# Healora — Reference Redesign Log

Based on the 6 reference landing pages (Clinika / Nova Medica / MedSphere / Doctify /
NovaCell / Solvex styles), adapted to our HARD rules: flat Untitled UI tokens,
no shadows/gradients, HugeIcons only, reduced-motion fallbacks, ≤200 lines/file.

## What changed

### Typography — serif italic accent (key reference motif)
- Added `Instrument Serif` (italic) as `--font-serif-accent` (`web/src/lib/fonts.ts`,
  `globals.css`), wired in `app/layout.tsx`.
- SectionHeading supports `titleAccent` prop → renders the accent word in
  serif italic brand color: e.g. "যে বিশেষজ্ঞ দরকার, *সে-ই খুঁজুন*".
- Hero renders the second headline line as an italic serif accent block.

### Hero (reference: doctor photo + floating trust chips)
- New portrait doctor hero image (2:3, teal `#E8F5F4` background).
- Three floating chips: verified, ৪.৯ rating, QR verification (float animation,
  disabled under reduced motion).
- Bottom "next slot" stat card retained.

### Sections (reference: category grid / stats / FAQ / CTA band / dark footer)
- Stats block enlarged (4xl/5xl numerals, brand color).
- Specialty grid: tinted hover cards with icon tile fill on hover.
- FinalCTA: oversized flat brand-600 panel with ghost QR motif + serif accent title.
- Footer: dark `bg-gray-900`, 4 columns (Services / Company / Help / Legal).

### i18n — full-coverage language switching (user-reported bug)
Root causes fixed:
1. `I18nProvider` never restored localStorage on mount → now restores in `useEffect`.
2. Most page copy was hardcoded Bangla → extracted into per-page copy modules
   `web/src/messages/copy/*.ts`, each `{ bn, en }` with identical shapes
   (type-checked via `satisfies HomeCopy` etc.), consumed through `usePageCopy(copy)`
   / `useHomeCopy()` hooks.
   Pages converted: about, pricing, faq, doctors, doctors/[id], contact, ambulance,
   privacy, terms, all patient dashboard pages, assistant/map/lab/pharmacy,
   doctor/hospital/admin portals, auth pages, and every homepage section.
   Layout (Footer, LoadingScreen) converted too. Seeded data values (names,
   hospitals, medicines) intentionally remain untranslated.

### New images (user-generated, consistent teal art direction)
`web/public/images/`: hero, doctors-banner, cta-doctor, consult-video,
qr-prescription, blood-donation, ambulance, hospital-front, assistant-hero,
pricing-hero, about-office, refreshed about-team/patient/doctor-female/app-preview.
Wired into: doctors list banner, pricing hero, about office, ambulance banner,
assistant/map headers (via sections/pages above).

## Safety/regression rules preserved
- ৯৯৯/999 emergency-first copy present in both languages everywhere.
- AI disclaimers ("not medical advice / রোগ নির্ণয় নয়") kept verbatim.
- No shadows/gradients anywhere; motion gated behind `useReducedMotion`.
