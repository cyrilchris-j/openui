# Tally Glyph Counter

Counts rendered as tally marks: groups of four vertical strokes with a diagonal fifth strike-through, animated stroke-by-stroke as the value ticks up — a counting display that predates numerals and still reads instantly.

## Install

```bash
openui add tally-glyph-counter
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `text` → subcategory `data`
- Interaction model: `value-tick`
- Visual model: `tally-stroke-groups`
- Motion model: `stroke-draw-increment`
- Semantic purpose: `counting-display`

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
