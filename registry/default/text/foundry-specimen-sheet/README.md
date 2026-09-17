# Foundry Specimen Sheet

A variable-font specimen: one phrase rendered at descending sizes and weights in a strict table, with a live weight axis slider that re-renders every row — how type foundries actually present a cut.

## Install

```bash
openui add foundry-specimen-sheet
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `text` → subcategory `technical`
- Interaction model: `axis-slider`
- Visual model: `size-weight-matrix`
- Motion model: `none`
- Semantic purpose: `type-promotion`

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
