# Fluid Smoke Turbulence

Navier-Stokes fluid dynamic smoke vortex currents swirling realistically on animated canvas.

## Install

```bash
openui add fluid-smoke-turbulence
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `backgrounds` → subcategory `canvases`
- Interaction model: `passive-fluid-vortex`
- Visual model: `turbulent-smoke-eddies`
- Motion model: `navier-stokes-vorticity`
- Semantic purpose: `fluid-turbulence-canvas`

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
