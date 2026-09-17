# Metric KPI Scoreboard

High-impact executive scoreboard banner displaying primary business KPIs across a single horizontal strip.

## Install

```bash
openui add metric-kpi-scoreboard
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `layouts` → subcategory `grids`
- Interaction model: `executive-scoreboard-scan`
- Visual model: `single-strip-kpi-scoreboard`
- Motion model: `none`
- Semantic purpose: `executive-telemetry-banner`

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
