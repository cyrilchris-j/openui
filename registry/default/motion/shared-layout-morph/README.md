# Shared Layout Morph

A selected card expands into a detail panel while its identity persists: FLIP technique — first, last, invert, play — implemented from scratch with measured rects and one transform, so the element never teleports.

## Install

```bash
openui add shared-layout-morph
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `motion` → subcategory `page`
- Interaction model: `select-expand`
- Visual model: `measured-rect-morph`
- Motion model: `flip-invert-play`
- Semantic purpose: `detail-navigation`

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
