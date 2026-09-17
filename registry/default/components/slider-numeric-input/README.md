# Slider Numeric Input

A range control synchronized with a numeric text input field for both analog and exact discrete entry.

## Install

```bash
openui add slider-numeric-input
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `components` → subcategory `inputs`
- Interaction model: `synchronized-slider-numeric`
- Visual model: `dual-input-calibrated-chassis`
- Motion model: `instantaneous-value-sync`
- Semantic purpose: `dual-entry-numeric-slider`

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
