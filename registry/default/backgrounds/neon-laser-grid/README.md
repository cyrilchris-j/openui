# Neon Laser Grid

Retro 80s arcade neon magenta and cyan luminous laser lines with glowing intersections.

## Install

```bash
openui add neon-laser-grid
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `backgrounds` → subcategory `ambient`
- Interaction model: `passive-neon-laser`
- Visual model: `luminescent-laser-lattice`
- Motion model: `none`
- Semantic purpose: `arcade-neon-grid`

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
