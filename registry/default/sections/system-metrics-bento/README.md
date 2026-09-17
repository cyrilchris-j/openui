# System Metrics Bento

A bento-style telemetry board displaying memory usage, throughput, and cluster worker health.

## Install

```bash
openui add system-metrics-bento
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `sections` → subcategory `telemetry`
- Interaction model: `system-metrics-bento-interaction`
- Visual model: `system-metrics-bento-visual`
- Motion model: `subtle`
- Semantic purpose: `system-metrics-bento-section`

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
