# Status Beacon Badge

An operational status badge pill featuring an animated pulsing radar dot and uptime latency telemetry.

## Install

```bash
openui add status-beacon-badge
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `components` → subcategory `feedback`
- Interaction model: `telemetry-beacon-inspection`
- Visual model: `pulsing-radar-pill`
- Motion model: `annular-ping-oscillation`
- Semantic purpose: `system-health-beacon`

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
