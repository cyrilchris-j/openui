# Slider Stepper Control

A continuous range bar flanked by decrement and increment step buttons for dual-mode adjustments.

## Install

```bash
openui add slider-stepper-control
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `components` → subcategory `inputs`
- Interaction model: `slider-with-flanking-steppers`
- Visual model: `hybrid-track-stepper`
- Motion model: `none`
- Semantic purpose: `calibrated-range-stepper`

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
