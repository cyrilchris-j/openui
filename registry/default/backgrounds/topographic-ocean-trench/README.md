# Topographic Ocean Trench

Deep bathymetric submarine trench isobaths illustrating ocean floor abyssal contours.

## Install

```bash
openui add topographic-ocean-trench
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `backgrounds` → subcategory `patterns`
- Interaction model: `passive-bathymetric-chart`
- Visual model: `abyssal-trench-isobaths`
- Motion model: `none`
- Semantic purpose: `ocean-depth-contour-layer`

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
