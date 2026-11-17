## Summary

## Changes

## Gate checklist (all must be true)
- [ ] `npx eslint src --max-warnings=0` clean
- [ ] `npx tsc --noEmit` clean
- [ ] `npm run build` green
- [ ] `python -m pytest tests -q` green (AI changes)
- [ ] `node scripts/audit-lines.mjs` — no file > 200 lines
- [ ] New API routes: validated + rate-limited + secure headers
- [ ] UI: keyboard + focus rings + reduced-motion fallback
- [ ] Medical copy: disclaimer present, 999-first for emergencies
- [ ] No secrets committed
