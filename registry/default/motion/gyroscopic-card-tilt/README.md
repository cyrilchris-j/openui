# Gyroscopic Card Tilt

A layered holographic identity card that tilts dynamically in 3D space based on mouse angle, simulating physical glass inertia.

## Install

```bash
openui add gyroscopic-card-tilt
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `motion` → subcategory `physics`
- Interaction model: `pointer-perspective-tilt`
- Visual model: `specular-sheen-surface`
- Motion model: `damped-euler-rotation`
- Semantic purpose: `premium-profile-pass`

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
