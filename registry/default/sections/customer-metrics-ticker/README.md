# Customer Metrics Ticker

A high-impact KPI telemetry strip with animated values, trending badges, and verification timestamps.

## Install

```bash
openui add customer-metrics-ticker
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `sections` → subcategory `stats`
- Interaction model: `customer-metrics-ticker-interaction`
- Visual model: `customer-metrics-ticker-visual`
- Motion model: `subtle`
- Semantic purpose: `customer-metrics-ticker-section`

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
