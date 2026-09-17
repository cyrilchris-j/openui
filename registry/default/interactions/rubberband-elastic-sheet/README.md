# Rubberband Elastic Sheet

A bottom sheet panel that stretches with spring resistance when pulled beyond top boundary.

## Install

```bash
openui add rubberband-elastic-sheet
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `interactions` → subcategory `gestures`
- Interaction model: `overscroll-sheet-drag`
- Visual model: `elastic-bottom-slab`
- Motion model: `viscous-boundary-rebound`
- Semantic purpose: `rubberband-sheet-controller`

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
