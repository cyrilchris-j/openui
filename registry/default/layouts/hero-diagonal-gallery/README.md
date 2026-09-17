# Hero Diagonal Gallery

Skewed ribbon of rotated image cards drifting diagonally behind landing hero typography.

## Install

```bash
openui add hero-diagonal-gallery
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `layouts` → subcategory `grids`
- Interaction model: `diagonal-ribbon-hero`
- Visual model: `skewed-image-stream-hero`
- Motion model: `none`
- Semantic purpose: `cinematic-diagonal-hero`

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
