# Stats Telemetry Banner

Numeric telemetry showcase highlighting scale metrics: 800 components, 14 packages, 0 errors.

## Install

```bash
openui add stats-telemetry-banner
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `sections` → subcategory `stats`
- Interaction model: `telemetry-stat-scan`
- Visual model: `metric-counter-strip`
- Motion model: `none`
- Semantic purpose: `scale-proof-telemetry`

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
