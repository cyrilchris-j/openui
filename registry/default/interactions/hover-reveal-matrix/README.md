# Hover Reveal Matrix

A matrix grid of tiles where individual cells light up with proximity bloom as mouse travels over the array.

## Install

```bash
openui add hover-reveal-matrix
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `interactions` → subcategory `hover`
- Interaction model: `grid-cell-proximity-illumination`
- Visual model: `matrix-tile-array`
- Motion model: `instantaneous-alpha-fadeout`
- Semantic purpose: `proximity-grid-sensor`

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
