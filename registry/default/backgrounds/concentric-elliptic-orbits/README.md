# Concentric Elliptic Orbits

Keplerian orbital mechanics planetary ellipses intersecting around gravitational focal points.

## Install

```bash
openui add concentric-elliptic-orbits
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `backgrounds` → subcategory `patterns`
- Interaction model: `passive-kepler-orbits`
- Visual model: `intersecting-orbital-ellipses`
- Motion model: `none`
- Semantic purpose: `astronomy-orbital-mechanics`

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
