# API Usage Quota Meter

A developer usage quota tracker presenting monthly API limits, current burn rate, and alert thresholds.

## Install

```bash
openui add api-usage-quota-meter
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `blocks` → subcategory `billing`
- Interaction model: `quota-usage-monitoring`
- Visual model: `threshold-meter-progress-card`
- Motion model: `subtle`
- Semantic purpose: `api-quota-consumption-tracking`

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
