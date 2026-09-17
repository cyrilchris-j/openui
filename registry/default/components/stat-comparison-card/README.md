# Stat Comparison Card

A comparative analytics tile showing current performance metrics evaluated against prior week benchmarks.

## Install

```bash
openui add stat-comparison-card
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `components` → subcategory `data-display`
- Interaction model: `kpi-period-comparison`
- Visual model: `bipartite-stat-slab`
- Motion model: `none`
- Semantic purpose: `performance-benchmark-card`

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
