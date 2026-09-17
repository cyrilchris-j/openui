# Rating Gauge Bar

A linear satisfaction gauge tracking breakdown percentages across ratings categories.

## Install

```bash
openui add rating-gauge-bar
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `components` → subcategory `feedback`
- Interaction model: `linear-satisfaction-breakdown`
- Visual model: `segmented-percentage-track`
- Motion model: `none`
- Semantic purpose: `satisfaction-gauge-bar`

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
