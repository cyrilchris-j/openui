# Split Flap Board

An airport-style flap display where each cell flips through cards top-over-bottom to reach its target; half-flap seams, staggered columns and the characteristic clack pacing are all CSS-only per cell.

## Install

```bash
openui add split-flap-board
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `text` → subcategory `kinetic`
- Interaction model: `value-sweep`
- Visual model: `hinged-flap-cells`
- Motion model: `top-over-flip-cascade`
- Semantic purpose: `status-board`

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
