# Drag Snap Slider Notches

A continuous range track with discrete notched stations providing magnetic snap detents upon slider release.

## Install

```bash
openui add drag-snap-slider-notches
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `interactions` → subcategory `pointer`
- Interaction model: `calibrated-notch-snapping`
- Visual model: `graduated-gauge-notches`
- Motion model: `detent-capture-glide`
- Semantic purpose: `notched-interval-selector`

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
