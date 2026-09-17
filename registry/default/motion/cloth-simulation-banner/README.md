# Cloth Simulation Banner

A physics-based Verlet integration mesh simulating a woven fabric flag waving dynamically in response to wind velocity.

## Install

```bash
openui add cloth-simulation-banner
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `motion` → subcategory `physics`
- Interaction model: `continuous-wind-oscillation`
- Visual model: `quad-mesh-wireframe`
- Motion model: `verlet-particle-constraint`
- Semantic purpose: `physics-banner-simulation`

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
