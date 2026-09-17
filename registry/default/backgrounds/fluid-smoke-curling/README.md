# Fluid Smoke Curling

Curling delicate wisps of incense smoke rising and undulating in still air.

## Install

```bash
openui add fluid-smoke-curling
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `backgrounds` → subcategory `ambient`
- Interaction model: `passive-smoke-wisp`
- Visual model: `curling-smoke-ribbon`
- Motion model: `none`
- Semantic purpose: `ambient-smoke-veil`

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
