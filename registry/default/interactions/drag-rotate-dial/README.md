# Drag Rotate Dial

A rotary knob computing continuous angle theta from dial origin as user drags pointer circularly around perimeter.

## Install

```bash
openui add drag-rotate-dial
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `interactions` → subcategory `pointer`
- Interaction model: `circular-perimeter-drag`
- Visual model: `graduated-bezel-knob`
- Motion model: `continuous-angle-tracking`
- Semantic purpose: `rotary-azimuth-controller`

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
