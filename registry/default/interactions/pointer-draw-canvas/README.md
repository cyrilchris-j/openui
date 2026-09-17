# Pointer Draw Canvas

An interactive sketch surface computing velocity-sensitive ink stroke thickness for expressive calligraphic drawing.

## Install

```bash
openui add pointer-draw-canvas
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `interactions` → subcategory `pointer`
- Interaction model: `freehand-pen-vector-tracking`
- Visual model: `variable-width-calligraphy-stroke`
- Motion model: `velocity-scaled-bezier-spline`
- Semantic purpose: `freeform-sketch-slate`

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
