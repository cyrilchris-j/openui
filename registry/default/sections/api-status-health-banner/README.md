# API Status Health Banner

A real-time edge system status banner reporting uptime percentages, latency metrics, and recent incident logs.

## Install

```bash
openui add api-status-health-banner
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `sections` → subcategory `telemetry`
- Interaction model: `api-status-health-banner-interaction`
- Visual model: `api-status-health-banner-visual`
- Motion model: `subtle`
- Semantic purpose: `api-status-health-banner-section`

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
