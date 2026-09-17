# Gravity Well Card

An interactive card where orbital canvas particles accelerate inward toward the pointer like miniature stellar matter.

## Install

```bash
openui add gravity-well-card
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `motion` → subcategory `physics`
- Interaction model: `pointer-orbital-attraction`
- Visual model: `newtonian-particle-mesh`
- Motion model: `gravitational-inverse-square`
- Semantic purpose: `astronomy-physics-card`

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
