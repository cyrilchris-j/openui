# Rebound Checkbox

A mechanical checkbox whose border compresses elastically before springing an animated SVG checkmark into lock.

## Install

```bash
openui add rebound-checkbox
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `motion` → subcategory `controls`
- Interaction model: `click-toggle-rebound`
- Visual model: `square-bordered-latch`
- Motion model: `svg-stroke-dash-spring`
- Semantic purpose: `boolean-verification-latch`

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
