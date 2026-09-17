# Kinetic Rubberband Toggle

A switch control whose pill thumb elongates and squashes during travel, simulating high-elasticity rubber before snapping into rest shape.

## Install

```bash
openui add kinetic-rubberband-toggle
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `motion` → subcategory `physics`
- Interaction model: `click-drag-snap-toggle`
- Visual model: `elastic-elongating-capsule`
- Motion model: `viscoelastic-squash-stretch`
- Semantic purpose: `boolean-state-switch`

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
