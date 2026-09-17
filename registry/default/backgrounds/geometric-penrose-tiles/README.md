# Geometric Penrose Tiles

Aperiodic non-repeating Penrose kite and dart rhombus tessellation with 5-fold local symmetry.

## Install

```bash
openui add geometric-penrose-tiles
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `backgrounds` → subcategory `patterns`
- Interaction model: `passive-penrose-tiling`
- Visual model: `aperiodic-rhombus-lattice`
- Motion model: `none`
- Semantic purpose: `aperiodic-tessellation-texture`

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
