# Metric Stat Card

A KPI scorecard tile featuring large numeric metrics, percentage delta badges, and contextual timeframe labels.

## Install

```bash
openui add metric-stat-card
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `components` → subcategory `data-display`
- Interaction model: `passive-kpi-inspection`
- Visual model: `bordered-kpi-card`
- Motion model: `none`
- Semantic purpose: `dashboard-metric-tile`

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
