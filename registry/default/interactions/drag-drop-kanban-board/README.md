# Drag Drop Kanban Board

A compact multi-lane task board allowing cards to transition between stages with active target ghosting.

## Install

```bash
openui add drag-drop-kanban-board
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `interactions` → subcategory `drag`
- Interaction model: `multi-lane-kanban-triage`
- Visual model: `dual-lane-board-deck`
- Motion model: `swimlane-transfer-reorder`
- Semantic purpose: `dual-lane-triage-board`

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
