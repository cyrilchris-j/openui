# Kinetic Pan Canvas

An infinite 2D canvas workspace supporting continuous pointer drag panning with coordinate grid readouts.

## Install

```bash
openui add kinetic-pan-canvas
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `interactions` → subcategory `drag`
- Interaction model: `infinite-viewport-drag-pan`
- Visual model: `cad-crosshair-canvas`
- Motion model: `damped-canvas-translation`
- Semantic purpose: `infinite-stage-panner`

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
