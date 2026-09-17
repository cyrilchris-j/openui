# Pan Zoom Minimap

A floating radar thumbnail box reflecting global canvas viewport coordinates and tracking pan state.

## Install

```bash
openui add pan-zoom-minimap
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `interactions` → subcategory `gestures`
- Interaction model: `viewport-minimap-reflection`
- Visual model: `scaled-orthographic-radar`
- Motion model: `proportional-reticle-translation`
- Semantic purpose: `canvas-radar-minimap`

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
