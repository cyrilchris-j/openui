# Elastic Slider Fill

A vertical fill tank slider where the liquid surface deforms and sloshes as user scrubs vertical level.

## Install

```bash
openui add elastic-slider-fill
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `interactions` → subcategory `pointer`
- Interaction model: `vertical-reservoir-scrub`
- Visual model: `columnar-liquid-tank`
- Motion model: `continuous-level-filling`
- Semantic purpose: `vertical-fluid-meter`

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
