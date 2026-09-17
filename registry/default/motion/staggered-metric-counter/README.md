# Staggered Metric Counter

A KPI scorecard row where numeric metrics increment simultaneously with staggered duration and spring finish.

## Install

```bash
openui add staggered-metric-counter
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `motion` → subcategory `counter`
- Interaction model: `simultaneous-metric-spinup`
- Visual model: `dashboard-stat-row`
- Motion model: `interpolated-rate-countup`
- Semantic purpose: `kpi-scorecard-banner`

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
