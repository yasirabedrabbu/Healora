## 22. Work process (Healora frontend)

### Rules
- Ekta batch = ekta feature/section. Batch shesh hole user test kore, error thakle pathay.
- Prottek file-er full code deowa hoy (partial edit na).
- UI text dui language-e: `src/messages/bn.ts` ar `src/messages/en.ts`. Banglish UI-te use hobe na.
- Icon: HugeIcons only. Letter/emoji icon use hobe na.
- Dark + light dui theme-e prottek component kaj korte hobe.
- Motion: GSAP + Three.js, prefers-reduced-motion respect.
- Build check: `npm run build` pass korle batch done.

### Stack
- Next.js (App Router), TypeScript, Tailwind CSS v4
- HugeIcons (@hugeicons/react, @hugeicons/core-free-icons)
- GSAP + ScrollTrigger, Three.js (react-three-fiber, drei)
- Sonner (toast), Untitled UI React (component reference, pending decision)
- next-themes (dark/light), custom i18n (bn/en)

### Status
- [x] Project setup (healora-web)
- [x] Design token (colour, font) - redo pending
- [ ] Design system: theme, i18n, icon wrapper, illustration set
- [ ] Homepage redesign (bn/en, dark/light)
- [ ] Public pages (8)
- [ ] Auth + onboarding (5)
- [ ] Doctor discovery + booking (5)
- [ ] Patient portal (6)
- [ ] Doctor portal (5)
- [ ] Verify + admin (4)
- [ ] Map, hospital, blood, AI (4)
- [ ] Final build, responsive, a11y check

### Open decisions
- Untitled UI React free vs PRO: kon component use hobe, naki shudhu HugeIcons diye custom?
- Logo: AI-generated mark na custom SVG?
- Hero 3D object: shield, QR card, naki capsule?

### Log
- 2026-11-17: Batch 1-4 review hoyeche. Design redo decision. Homepage-e layout, icon, i18n, dark mode, illustration pabe.