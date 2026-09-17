# Quantum Particle Web

Interactive constellation web connecting nearby drifting particles with dynamic threshold lines.

## Install

```bash
openui add quantum-particle-web
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `backgrounds` → subcategory `canvases`
- Interaction model: `passive-canvas-particles`
- Visual model: `proximity-constellation-network`
- Motion model: `stochastic-particle-drift`
- Semantic purpose: `network-graph-backdrop`

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
