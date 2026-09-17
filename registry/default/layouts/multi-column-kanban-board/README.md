# Multi Column Kanban Board

Horizontal scrolling kanban workspace with responsive column rails and card racks.

## Install

```bash
openui add multi-column-kanban-board
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `layouts` → subcategory `grids`
- Interaction model: `kanban-column-horizontal-flow`
- Visual model: `multi-column-workflow-board`
- Motion model: `none`
- Semantic purpose: `project-kanban-stage`

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
