# Time Range Picker

An intuitive time span selector with preset duration pills, custom start/end hour inputs, and visual range bar.

## Install

```bash
openui add time-range-picker
```

Dependencies: lucide-react.

## What makes it distinct

- Category: `components` → subcategory `controls`
- Interaction model: `interval-slider-selection`
- Visual model: `time-interval-bar`
- Motion model: `none`
- Semantic purpose: `time-window-specification`

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
