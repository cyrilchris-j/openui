# Radial Progress Wheel

An SVG circular progress ring animating through arc strokes with continuous dash-offset rotation and elastic endpoint spring.

## Install

```bash
openui add radial-progress-wheel
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `motion` → subcategory `loaders`
- Interaction model: `percentage-stroke-advance`
- Visual model: `circular-svg-arc-meter`
- Motion model: `dashoffset-spring-interpolation`
- Semantic purpose: `radial-percentage-gauge`

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
