# Split Comparison Slider

Before-and-after visual comparison framework with center boundary line.

## Install

```bash
openui add split-comparison-slider
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `layouts` → subcategory `splits`
- Interaction model: `before-after-divider`
- Visual model: `dual-layer-comparison-stage`
- Motion model: `none`
- Semantic purpose: `visual-regression-inspection`

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
