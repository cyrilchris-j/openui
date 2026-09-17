# Customer Churn Risk Analyzer

An AI telemetry analyzer tracking client engagement decline, health score metrics, and retention triggers.

## Install

```bash
openui add customer-churn-risk-analyzer
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `blocks` → subcategory `crm`
- Interaction model: `churn-risk-scoring-drilldown`
- Visual model: `predictive-customer-risk-gauge`
- Motion model: `subtle`
- Semantic purpose: `customer-retention-scoring`

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
