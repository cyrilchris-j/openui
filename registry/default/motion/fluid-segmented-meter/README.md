# Fluid Segmented Meter

A multi-cell battery meter filling discrete energy blocks with sequenced neon charge pulses.

## Install

```bash
openui add fluid-segmented-meter
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `motion` → subcategory `feedback`
- Interaction model: `charge-level-sequence`
- Visual model: `partitioned-cell-gauge`
- Motion model: `stepwise-energy-pulse`
- Semantic purpose: `energy-cell-gauge`

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
