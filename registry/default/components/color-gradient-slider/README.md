# Color Gradient Slider

Multi-stop CSS linear gradient builder with adjustable color stops, angle control, and copyable CSS string.

## Install

```bash
openui add color-gradient-slider
```

Dependencies: lucide-react.

## What makes it distinct

- Category: `components` → subcategory `controls`
- Interaction model: `multi-stop-gradient-tuning`
- Visual model: `gradient-strip-preview`
- Motion model: `none`
- Semantic purpose: `gradient-generator`

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
