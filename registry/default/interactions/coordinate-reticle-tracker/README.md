# Coordinate Reticle Tracker

A precision HUD targeting scope displaying delta distance and polar theta relative to center crosshair.

## Install

```bash
openui add coordinate-reticle-tracker
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `interactions` → subcategory `pointer`
- Interaction model: `polar-target-telemetry`
- Visual model: `hud-concentric-graticule`
- Motion model: `continuous-telemetry-readout`
- Semantic purpose: `targeting-telemetry-reticle`

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
