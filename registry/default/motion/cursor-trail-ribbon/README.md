# Cursor Trail Ribbon

A fading ribbon that follows the pointer as a polyline of recent positions rendered on canvas with quadratic smoothing — width and opacity taper along the trail's age, decaying to nothing when the pointer stops.

## Install

```bash
openui add cursor-trail-ribbon
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `motion` → subcategory `experimental`
- Interaction model: `pointer-history`
- Visual model: `canvas-smoothed-polyline`
- Motion model: `age-tapered-decay`
- Semantic purpose: `pointer-delight`

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
