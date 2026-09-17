# Thermal Print Type

Text emerges as if printed by a receipt printer: a hard clip line sweeps downward in steps while a dither mask fades in behind it, with the characteristic slight horizontal jitter of a misaligned head.

## Install

```bash
openui add thermal-print-type
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `text` → subcategory `paint`
- Interaction model: `in-view-trigger`
- Visual model: `clip-line-plus-dither`
- Motion model: `stepped-sweep`
- Semantic purpose: `narrative-accent`

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
