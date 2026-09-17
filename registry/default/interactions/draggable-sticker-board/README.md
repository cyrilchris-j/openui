# Draggable Sticker Board

A freeform pinboard surface allowing multiple graphic badges and stickers to be repositioned freely with mouse drag.

## Install

```bash
openui add draggable-sticker-board
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `interactions` → subcategory `drag`
- Interaction model: `freeform-sticker-placement`
- Visual model: `scattered-pinboard-tokens`
- Motion model: `2d-direct-manipulation`
- Semantic purpose: `sticker-collage-board`

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
