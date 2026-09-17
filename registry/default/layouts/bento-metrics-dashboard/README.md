# Bento Metrics Dashboard

Analytics bento box layout coordinating charts, tables, KPIs, and regional status panels.

## Install

```bash
openui add bento-metrics-dashboard
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `layouts` → subcategory `grids`
- Interaction model: `bento-telemetry-scan`
- Visual model: `modular-metric-tiles`
- Motion model: `none`
- Semantic purpose: `bento-analytics-matrix`

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
