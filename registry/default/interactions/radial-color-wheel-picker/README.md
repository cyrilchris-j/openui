# Radial Color Wheel Picker

A circular color selector calculating hue and saturation polar coordinates from pointer position with live swatch feedback.

## Install

```bash
openui add radial-color-wheel-picker
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `interactions` → subcategory `pointer`
- Interaction model: `polar-color-selection`
- Visual model: `conic-spectrum-disc`
- Motion model: `radial-reticle-positioning`
- Semantic purpose: `radial-color-evaluator`

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
