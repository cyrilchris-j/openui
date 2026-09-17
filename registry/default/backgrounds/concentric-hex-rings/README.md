# Concentric Hex Rings

Concentric nesting regular hexagons scaling symmetrically outward from viewport center.

## Install

```bash
openui add concentric-hex-rings
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `backgrounds` → subcategory `ambient`
- Interaction model: `passive-hex-rings`
- Visual model: `nesting-hexagonal-shells`
- Motion model: `none`
- Semantic purpose: `hexagonal-target-canvas`

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
