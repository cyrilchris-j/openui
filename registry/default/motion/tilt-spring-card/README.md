# Tilt Spring Card

Pointer-driven 3D tilt with a real spring integrator: rotation chases the pointer through a damped spring rather than lerping, so quick circles overshoot and settle — the difference between a transition and a physical object.

## Install

```bash
openui add tilt-spring-card
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `motion` → subcategory `hover`
- Interaction model: `pointer-tilt`
- Visual model: `perspective-rotation`
- Motion model: `damped-spring-rotation`
- Semantic purpose: `showcase-card`

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
