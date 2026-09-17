# Magnetic Card Hover

An elevation card that lifts and casts dynamic cast shadows while floating softly toward cursor position.

## Install

```bash
openui add magnetic-card-hover
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `motion` → subcategory `physics`
- Interaction model: `hover-elevation-float`
- Visual model: `floating-surface-shadow`
- Motion model: `z-elevation-shadow-drift`
- Semantic purpose: `tactile-card-elevation`

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
