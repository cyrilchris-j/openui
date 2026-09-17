# Stepper Journey Map

Horizontal service blueprint journey map aligning user persona stages with system reactions.

## Install

```bash
openui add stepper-journey-map
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `layouts` → subcategory `grids`
- Interaction model: `journey-blueprint-inspection`
- Visual model: `horizontal-journey-grid`
- Motion model: `none`
- Semantic purpose: `ux-service-blueprint`

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
