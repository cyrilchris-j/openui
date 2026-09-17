# Pinch Zoom Viewport

A 2D interactive canvas stage supporting stepped wheel zoom and click-drag panning across high-density artwork.

## Install

```bash
openui add pinch-zoom-viewport
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `interactions` → subcategory `gestures`
- Interaction model: `viewport-pan-and-zoom`
- Visual model: `nested-coordinate-grid`
- Motion model: `scaled-matrix-transformation`
- Semantic purpose: `cad-inspection-viewport`

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
