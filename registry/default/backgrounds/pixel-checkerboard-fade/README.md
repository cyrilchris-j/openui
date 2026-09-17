# Pixel Checkerboard Fade

Retro 8-bit dithered checkerboard pattern with optical fade mask across the viewport.

## Install

```bash
openui add pixel-checkerboard-fade
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `backgrounds` → subcategory `patterns`
- Interaction model: `passive-dithered-checkerboard`
- Visual model: `pixelated-checkerboard-fade`
- Motion model: `none`
- Semantic purpose: `retro-dithering-mask`

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
