# Kinetic Stepper Counter

An animated counter displaying rolling numeric wheels with momentum acceleration and vertical wheel blur.

## Install

```bash
openui add kinetic-stepper-counter
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `motion` → subcategory `counter`
- Interaction model: `increment-decrement-stepper`
- Visual model: `vertical-rolling-wheel`
- Motion model: `discrete-rotary-step`
- Semantic purpose: `odometer-counter-widget`

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
