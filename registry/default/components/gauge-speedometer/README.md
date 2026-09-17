# Gauge Speedometer

SVG arc speedometer gauge showing current utilization percentage with color warning thresholds.

## Install

```bash
openui add gauge-speedometer
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `components` → subcategory `data-display`
- Interaction model: `slider-driven-arc-gauge`
- Visual model: `radial-speedometer-arc`
- Motion model: `none`
- Semantic purpose: `utilization-telemetry-gauge`

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
