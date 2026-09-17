# LED Dot Matrix Text

Real dot-matrix rendering: a 5×7 bitmap font map draws each character as a grid of glowing dots on canvas — with per-dot bokeh, row scanlines and a scrolling mode that shifts the bitmap like a station display.

## Install

```bash
openui add led-dot-matrix-text
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `text` → subcategory `paint`
- Interaction model: `bitmap-scroll`
- Visual model: `canvas-dot-font`
- Motion model: `pixel-scroll`
- Semantic purpose: `status-display`

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
