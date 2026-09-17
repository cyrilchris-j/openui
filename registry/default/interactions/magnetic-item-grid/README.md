# Magnetic Item Grid

A grid of icons where hovered items attract toward cursor while pushing neighboring items outward.

## Install

```bash
openui add magnetic-item-grid
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `interactions` → subcategory `hover`
- Interaction model: `neighbor-repulsion-grid`
- Visual model: `tessellated-cell-mosaic`
- Motion model: `radial-displacement-field`
- Semantic purpose: `magnetic-cluster-grid`

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
