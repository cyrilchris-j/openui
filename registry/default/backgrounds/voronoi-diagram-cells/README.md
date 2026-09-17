# Voronoi Diagram Cells

Computational geometry cellular Voronoi tessellation partitions with boundary line edges.

## Install

```bash
openui add voronoi-diagram-cells
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `backgrounds` → subcategory `patterns`
- Interaction model: `passive-voronoi-tessellation`
- Visual model: `polygon-cellular-partitions`
- Motion model: `none`
- Semantic purpose: `cellular-voronoi-texture`

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
