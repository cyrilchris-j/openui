# Concentric Radar Rings

Expanding concentric circles with crosshair range finders creating a tactical radar sweep ambiance.

## Install

```bash
openui add concentric-radar-rings
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `backgrounds` → subcategory `ambient`
- Interaction model: `passive-radar-ambiance`
- Visual model: `concentric-range-rings`
- Motion model: `subtle-pulsing-rings`
- Semantic purpose: `telemetry-radar-canvas`

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
