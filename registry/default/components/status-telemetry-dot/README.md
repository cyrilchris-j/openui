# Status Telemetry Dot

A compact status dot badge with pulsing concentric halo for system observability.

## Install

```bash
openui add status-telemetry-dot
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `components` → subcategory `data-display`
- Interaction model: `telemetry-dot-ping`
- Visual model: `concentric-halo-dot`
- Motion model: `none`
- Semantic purpose: `observability-status-dot`

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
