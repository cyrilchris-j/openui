# Perspective Cube Flip

A 3D cube revolving 90 degrees around its horizontal axis to transition between dual interactive facets.

## Install

```bash
openui add perspective-cube-flip
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `motion` → subcategory `transitions`
- Interaction model: `cube-face-revolve`
- Visual model: `3d-faceted-box`
- Motion model: `orthographic-rotation-step`
- Semantic purpose: `bifaceted-status-cube`

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
