# Customer Satisfaction Metric

A single bold CSAT metric display highlighting developer happiness and net promoter ratings.

## Install

```bash
openui add customer-satisfaction-metric
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `sections` → subcategory `stats`
- Interaction model: `customer-satisfaction-metric-interaction`
- Visual model: `customer-satisfaction-metric-visual`
- Motion model: `subtle`
- Semantic purpose: `customer-satisfaction-metric-section`

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
