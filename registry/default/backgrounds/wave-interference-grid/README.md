# Wave Interference Grid

Physical dual-source wave interference pattern with constructive and destructive wave crests.

## Install

```bash
openui add wave-interference-grid
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `backgrounds` → subcategory `canvases`
- Interaction model: `passive-canvas-physics`
- Visual model: `constructive-interference-ripples`
- Motion model: `dual-source-frequency-propagation`
- Semantic purpose: `wave-optics-simulation`

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
