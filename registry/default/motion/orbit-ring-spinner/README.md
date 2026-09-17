# Orbit Ring Spinner

A gyroscopic multi-axis ring loading spinner executing concentric orbital rotations with varying phase velocities.

## Install

```bash
openui add orbit-ring-spinner
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `motion` → subcategory `loaders`
- Interaction model: `continuous-rotation-cycle`
- Visual model: `gimbal-ring-assembler`
- Motion model: `multi-axis-gyroscopic-spin`
- Semantic purpose: `gyroscopic-loading-spinner`

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
