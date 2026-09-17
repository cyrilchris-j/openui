# Analytics Overview Dashboard

A comprehensive metric workspace with KPI cards, revenue breakdowns, period filters, and live telemetry badges.

## Install

```bash
openui add analytics-overview-dashboard
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `blocks` → subcategory `dashboard`
- Interaction model: `timeframe-filter-kpi-drilldown`
- Visual model: `metric-grid-with-chart-canvas`
- Motion model: `subtle`
- Semantic purpose: `business-telemetry-dashboard`

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
