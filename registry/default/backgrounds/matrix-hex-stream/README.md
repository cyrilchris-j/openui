# Matrix Hex Stream

Hexadecimal byte stream memory dump (0xDEAD, 0xBEEF) raining downward on canvas.

## Install

```bash
openui add matrix-hex-stream
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `backgrounds` → subcategory `canvases`
- Interaction model: `passive-hex-stream`
- Visual model: `hexadecimal-memory-dump`
- Motion model: `vertical-code-rain`
- Semantic purpose: `hex-telemetry-backdrop`

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
