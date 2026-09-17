# Abstract Noise Waves

Layered undulating sine wave ribbons flowing smoothly across an animated HTML5 canvas.

## Install

```bash
openui add abstract-noise-waves
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `backgrounds` → subcategory `canvases`
- Interaction model: `passive-canvas-waves`
- Visual model: `undulating-sine-ribbons`
- Motion model: `continuous-wave-flow`
- Semantic purpose: `organic-wave-animation`

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
