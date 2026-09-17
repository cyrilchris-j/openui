# Bento Modular Grid

Bento box modular 12-column dashboard layout with dynamic cell spans and harmonic cell paddings.

## Install

```bash
openui add bento-modular-grid
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `layouts` → subcategory `grids`
- Interaction model: `bento-modular-tiling`
- Visual model: `asymmetric-tile-mosaic`
- Motion model: `none`
- Semantic purpose: `feature-showcase-mosaic`

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
