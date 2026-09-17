# Interlocking Rings Pattern

Classic geometric interlocking circle torus rings forming an intricate intersecting lattice.

## Install

```bash
openui add interlocking-rings-pattern
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `backgrounds` → subcategory `patterns`
- Interaction model: `passive-torus-geometry`
- Visual model: `interlaced-circle-rings`
- Motion model: `none`
- Semantic purpose: `ornamental-circle-mesh`

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
