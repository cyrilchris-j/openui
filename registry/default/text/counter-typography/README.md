# Counter Typography

Numeric tweening with tabular figures, an ease-out curve and locale-aware grouping; the width is reserved from the final value so the surrounding line never shifts while counting.

## Install

```bash
openui add counter-typography
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `text` → subcategory `numeric`
- Interaction model: `in-view-trigger`
- Visual model: `tabular-figures`
- Motion model: `ease-out-tween`
- Semantic purpose: `metric-display`

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
