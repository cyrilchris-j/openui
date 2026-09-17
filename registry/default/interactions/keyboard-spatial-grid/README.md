# Keyboard Spatial Grid

A 2D navigation grid supporting full directional arrow key navigation, spatial focus retention, and enter activation.

## Install

```bash
openui add keyboard-spatial-grid
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `interactions` → subcategory `keyboard`
- Interaction model: `spatial-arrow-key-navigation`
- Visual model: `coordinate-matrix-cells`
- Motion model: `discrete-cell-jump`
- Semantic purpose: `spatial-grid-navigator`

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
