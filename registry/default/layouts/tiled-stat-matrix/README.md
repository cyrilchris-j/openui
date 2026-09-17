# Tiled Stat Matrix

Four-column metric telemetry dashboard grid with uniform gutters and responsive wrapping.

## Install

```bash
openui add tiled-stat-matrix
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `layouts` → subcategory `grids`
- Interaction model: `stat-tile-telemetry-scan`
- Visual model: `four-column-kpi-rack`
- Motion model: `none`
- Semantic purpose: `kpi-metric-matrix`

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
