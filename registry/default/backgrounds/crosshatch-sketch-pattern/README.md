# Crosshatch Sketch Pattern

Architectural dual-direction 45-degree diagonal line crosshatching pattern.

## Install

```bash
openui add crosshatch-sketch-pattern
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `backgrounds` → subcategory `patterns`
- Interaction model: `passive-engraving-backdrop`
- Visual model: `dual-diagonal-hatching`
- Motion model: `none`
- Semantic purpose: `etching-texture-layer`

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
