# Multi Range Histogram

Interactive distribution chart with dual-threshold range sliders to filter numeric dataset partitions.

## Install

```bash
openui add multi-range-histogram
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `components` → subcategory `data-display`
- Interaction model: `histogram-slice-selection`
- Visual model: `columnar-distribution-bars`
- Motion model: `none`
- Semantic purpose: `distribution-range-filter`

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
