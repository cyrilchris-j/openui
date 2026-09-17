# Magnetic Pull Card

A card surface that feels magnetic attraction toward the pointer with dual-stage translation and 3D rotational tilt governed by Hooke's law.

## Install

```bash
openui add magnetic-pull-card
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `motion` → subcategory `physics`
- Interaction model: `pointer-proximity-attraction`
- Visual model: `bordered-specimen-slab`
- Motion model: `damped-hookean-spring-attractor`
- Semantic purpose: `interactive-feature-tile`

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
