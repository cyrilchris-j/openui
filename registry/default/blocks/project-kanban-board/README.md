# Project Kanban Board

A three-column kanban task board with lane counters, task priority chips, and card selection.

## Install

```bash
openui add project-kanban-board
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `blocks` → subcategory `kanban`
- Interaction model: `kanban-card-status-workflow`
- Visual model: `three-column-swimlane-board`
- Motion model: `subtle`
- Semantic purpose: `project-task-management`

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
