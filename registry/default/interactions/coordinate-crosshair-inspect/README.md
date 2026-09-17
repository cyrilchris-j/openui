# Coordinate Crosshair Inspect

A precision inspection canvas overlay drawing orthogonal crosshair guides with realtime coordinate readouts.

## Install

```bash
openui add coordinate-crosshair-inspect
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `interactions` → subcategory `pointer`
- Interaction model: `orthogonal-reticle-scrub`
- Visual model: `cad-graticule-crosshair`
- Motion model: `instantaneous-coordinate-tracking`
- Semantic purpose: `cad-inspection-reticle`

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
