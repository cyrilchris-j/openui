# Elastic Stepper Dots

Pagination carousel dots where the active dot stretches into an elongated pill before snapping to the next target.

## Install

```bash
openui add elastic-stepper-dots
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `motion` → subcategory `indicators`
- Interaction model: `step-dot-selection`
- Visual model: `stretching-capsule-bead`
- Motion model: `aspect-ratio-elastic-snap`
- Semantic purpose: `carousel-step-indicator`

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
