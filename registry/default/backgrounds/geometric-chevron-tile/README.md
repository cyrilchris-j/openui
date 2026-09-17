# Geometric Chevron Tile

Diagonal herringbone chevron tiles creating an orderly zig-zag textile texture.

## Install

```bash
openui add geometric-chevron-tile
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `backgrounds` → subcategory `patterns`
- Interaction model: `passive-textile-pattern`
- Visual model: `zigzag-herringbone-mesh`
- Motion model: `none`
- Semantic purpose: `editorial-textile-pattern`

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
