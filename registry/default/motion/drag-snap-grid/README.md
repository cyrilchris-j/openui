# Drag Snap Grid

Draggable tiles that snap to the nearest grid cell on release with a spring settle — occupancy is enforced (a cell holds one tile), and the displaced tile animates to the freed cell, making the grid itself the state machine.

## Install

```bash
openui add drag-snap-grid
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `motion` → subcategory `gesture`
- Interaction model: `drag-snap-arrange`
- Visual model: `cell-occupancy-tiles`
- Motion model: `spring-snap-swap`
- Semantic purpose: `arrangeable-content`

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
