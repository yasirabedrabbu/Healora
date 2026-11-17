# Healora Redesign Log

Reference patterns researched (cited as pattern names, per brief):

- **Dribbble — "Soft-glow medical dashboard cards"**: rounded 24px panels,
  generous 32px internal padding, single accent icon tile per card. Adopted:
  icon-tile pattern across all portal pages (brand-25 tile, brand ring).
- **Dribbble — "Status pill systems in health apps"**: status = dot + label in
  a tinted pill (never colour alone). Adopted in beds, queue, orders,
  verification (§12 colour-blind rule).
- **Dribbble — "One-action hero booking"**: marketing hero keeps a single
  dominant CTA pair; secondary action demoted to ghost/outline. Adopted in
  FinalCTA + hero.
- **Behance — "Editorial oversized numerals"**: big Clash Display figures for
  stats (TrustStrip, beds, earnings) — numbers carry hierarchy, not borders.
- **Behance — "Split QR prescription sheet"**: prescription detail laid out as
  a document sheet with a QR anchor card. Adopted in emergency-card +
  pharmacy dispense.
- **Pinterest — "Full-bleed draggable rails"**: horizontally draggable
  testimonial rail with cursor-grab affordance. Shipped (wow pass).
- **Pinterest — "Floating pill navigation"**: detached rounded navbar with
  sliding active indicator. Shipped.

## Deltas applied this pass

| Area | Change |
|---|---|
| New portal pages | Same card/icon-tile/status-pill system as existing portals — zero one-off styles |
| Assistant widget | Chat bubbles in brand tint; emergency bubble switches to error tint with 999 first |
| Map page | Layer badges + static MapLibre frame; keeps 999 "nearest ER" affordance top-right |
| Lab booking | Selectable test cards with price + home-collection badge (Behance split-sheet cue) |
| Nav/footer | Footer sitemap extended to all 7 services; FAQ promoted to page |

## Fixed constraints honored

Untitled UI tokens only · Hugeicons only · no shadows/gradients (borders +
motion for depth) · ≤200 lines/file · reduced-motion fallbacks on every
animated surface (widget bubbles, FAB, rails).
