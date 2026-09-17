# Page Wipe Transition

A full-bleed panel wipes across the viewport in two phases — an entering panel covers with an accelerated ease, the new content is swapped beneath it, then the panel exits slower with deceleration, mimicking an editor's cut.

## Install

```bash
openui add page-wipe-transition
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `motion` → subcategory `page`
- Interaction model: `navigate-trigger`
- Visual model: `full-bleed-curtain`
- Motion model: `two-phase-wipe`
- Semantic purpose: `route-transition`

## Accessibility

- Keyboard reachable; visible focus ring.
- Honours `prefers-reduced-motion`: animation is disabled or replaced with a
  static state change.
- Semantic HTML first; ARIA only where the semantics need help.

## When to use

When the interface needs exactly this behaviour — check the fingerprint above
against the composition you are building.

## When not to use

When a simpler resource meets the need. Do not stack decorative motion on top
of a surface that already carries motion.
