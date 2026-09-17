# Glitch RGB Split

Horizontal chromatic aberration split separating red and cyan video color channels.

## Install

```bash
openui add glitch-rgb-split
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `backgrounds` → subcategory `ambient`
- Interaction model: `passive-rgb-aberration`
- Visual model: `channel-offset-split`
- Motion model: `none`
- Semantic purpose: `chromatic-aberration-texture`

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
