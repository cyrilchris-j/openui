# Sales Pipeline Stage Funnel

A conversion stage funnel visualizing visitor-to-customer conversion percentages across the pipeline.

## Install

```bash
openui add sales-pipeline-stage-funnel
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `blocks` → subcategory `analytics`
- Interaction model: `funnel-conversion-rate-breakdown`
- Visual model: `stepped-sales-funnel-bars`
- Motion model: `subtle`
- Semantic purpose: `revenue-funnel-analytics`

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
