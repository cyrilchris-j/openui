# Hover Spotlight Card

A surface whose boundary and backdrop light up with dynamic radial gradient illumination following cursor coordinates.

## Install

```bash
openui add hover-spotlight-card
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `interactions` → subcategory `hover`
- Interaction model: `pointer-radial-spotlight`
- Visual model: `specular-boundary-conic`
- Motion model: `instantaneous-coordinate-gradient`
- Semantic purpose: `spotlight-illumination-card`

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
