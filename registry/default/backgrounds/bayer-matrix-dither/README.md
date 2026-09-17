# Bayer Matrix Dither

Ordered 4x4 Bayer dithering matrix pattern simulating classic Mac 1-bit bitmap graphics.

## Install

```bash
openui add bayer-matrix-dither
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `backgrounds` → subcategory `patterns`
- Interaction model: `passive-bayer-dither`
- Visual model: `ordered-threshold-matrix`
- Motion model: `none`
- Semantic purpose: `one-bit-dithering-mask`

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
