# Confetti Particle Field

Multi-colored geometric confetti squares drifting slowly downward across an celebratory canvas backdrop.

## Install

```bash
openui add confetti-particle-field
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `backgrounds` → subcategory `canvases`
- Interaction model: `passive-canvas-confetti`
- Visual model: `falling-geometric-flakes`
- Motion model: `downward-swaying-drift`
- Semantic purpose: `celebratory-particle-field`

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
