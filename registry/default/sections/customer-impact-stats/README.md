# Customer Impact Stats

A quantitative impact report showing cumulative developer hours saved and issues mitigated.

## Install

```bash
openui add customer-impact-stats
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `sections` → subcategory `stats`
- Interaction model: `customer-impact-stats-interaction`
- Visual model: `customer-impact-stats-visual`
- Motion model: `subtle`
- Semantic purpose: `customer-impact-stats-section`

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
