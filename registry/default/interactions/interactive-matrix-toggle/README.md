# Interactive Matrix Toggle

A 4x4 matrix bitboard enabling click-and-drag paint toggling across binary cells for pattern authoring.

## Install

```bash
openui add interactive-matrix-toggle
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `interactions` → subcategory `pointer`
- Interaction model: `drag-paint-cell-toggling`
- Visual model: `bitboard-tile-matrix`
- Motion model: `instantaneous-bit-inversion`
- Semantic purpose: `bitboard-pattern-editor`

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
