# Bento Portfolio Grid

Creative designer portfolio bento grid with case study cover, live metric pill, and bio card.

## Install

```bash
openui add bento-portfolio-grid
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `layouts` → subcategory `grids`
- Interaction model: `portfolio-bento-inspection`
- Visual model: `asymmetric-portfolio-mosaic`
- Motion model: `none`
- Semantic purpose: `designer-portfolio-mosaic`

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
