# Interactive Metric Sparkline

A KPI telemetry card pairing high-precision numerical stats with interactive trend sparkline charts.

## Install

```bash
openui add interactive-metric-sparkline
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `blocks` → subcategory `analytics`
- Interaction model: `sparkline-telemetry-scrubbing`
- Visual model: `stat-card-with-embedded-chart`
- Motion model: `subtle`
- Semantic purpose: `metric-sparkline-visualization`

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
