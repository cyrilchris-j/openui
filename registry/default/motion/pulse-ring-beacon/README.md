# Pulse Ring Beacon

An animated radar status indicator broadcasting expanding concentric pulse rings into surrounding space.

## Install

```bash
openui add pulse-ring-beacon
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `motion` → subcategory `indicators`
- Interaction model: `continuous-radar-broadcast`
- Visual model: `annular-pulse-radiator`
- Motion model: `radial-fadeout-expansion`
- Semantic purpose: `live-telemetry-beacon`

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
