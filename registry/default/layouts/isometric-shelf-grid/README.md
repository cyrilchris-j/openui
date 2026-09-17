# Isometric Shelf Grid

Angled 3D isometric display shelf layout showcasing product cards or 3D assets.

## Install

```bash
openui add isometric-shelf-grid
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `layouts` → subcategory `grids`
- Interaction model: `isometric-shelf-presentation`
- Visual model: `angled-showcase-tier`
- Motion model: `none`
- Semantic purpose: `isometric-product-display`

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
