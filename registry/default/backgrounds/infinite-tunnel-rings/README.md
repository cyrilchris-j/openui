# Infinite Tunnel Rings

Concentric perspective square portal frames receding into an infinite central corridor.

## Install

```bash
openui add infinite-tunnel-rings
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `backgrounds` → subcategory `ambient`
- Interaction model: `passive-infinite-tunnel`
- Visual model: `receding-square-frames`
- Motion model: `none`
- Semantic purpose: `infinite-portal-tunnel`

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
