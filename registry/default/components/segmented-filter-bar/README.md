# Segmented Filter Bar

A compact segmented bar with active item pill indicator for filtering catalog tables.

## Install

```bash
openui add segmented-filter-bar
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `components` → subcategory `controls`
- Interaction model: `segmented-filter-selection`
- Visual model: `pill-filter-track`
- Motion model: `none`
- Semantic purpose: `table-filter-bar`

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
