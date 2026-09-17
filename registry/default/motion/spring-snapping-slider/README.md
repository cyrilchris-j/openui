# Spring Snapping Slider

A numeric range control where the thumb glides with simulated mass and snaps toward discrete notched positions via magnetic spring detents.

## Install

```bash
openui add spring-snapping-slider
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `motion` → subcategory `physics`
- Interaction model: `continuous-drag-notched-snap`
- Visual model: `ruled-calibrated-gauge`
- Motion model: `restoring-spring-detent`
- Semantic purpose: `calibrated-value-selector`

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
