# Rubberband Elastic Toggle

A mechanical binary toggle switch that deforms elastically under drag displacement before snapping closed.

## Install

```bash
openui add rubberband-elastic-toggle
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `interactions` → subcategory `gestures`
- Interaction model: `elastic-thumb-drag-toggle`
- Visual model: `elongating-pill-cavity`
- Motion model: `snap-to-edge-viscoelastic`
- Semantic purpose: `viscoelastic-switch-toggle`

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
