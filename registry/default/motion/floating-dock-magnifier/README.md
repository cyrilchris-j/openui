# Floating Dock Magnifier

A desktop navigation dock where individual icon targets scale smoothly using a Gaussian proximity curve as pointer glides across.

## Install

```bash
openui add floating-dock-magnifier
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `motion` → subcategory `gestures`
- Interaction model: `gaussian-proximity-scale`
- Visual model: `docked-horizontal-shelf`
- Motion model: `bell-curve-expansion`
- Semantic purpose: `app-launcher-dock`

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
