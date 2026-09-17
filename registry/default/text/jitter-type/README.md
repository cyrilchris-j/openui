# Jitter Type

Seeded per-glyph jitter on a coarse grid: each character offsets by a quantised random amount that re-rolls on an offbeat interval, so the field feels alive without a full-time animation loop.

## Install

```bash
openui add jitter-type
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `text` → subcategory `paint`
- Interaction model: `interval-quantised`
- Visual model: `seeded-offset-field`
- Motion model: `quantised-jump`
- Semantic purpose: `poster-energy`

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
