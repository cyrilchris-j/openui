# Drag Drop Card Stack

A deck of cards that can be dragged into discrete discard or retain target drop bins.

## Install

```bash
openui add drag-drop-card-stack
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `interactions` → subcategory `drag`
- Interaction model: `card-deck-drop-sorting`
- Visual model: `bin-delimited-stage`
- Motion model: `2d-drop-target-capture`
- Semantic purpose: `card-sorting-evaluator`

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
