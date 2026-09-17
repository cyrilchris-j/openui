# Sortable Kanban Column

A vertical Kanban pipeline lane supporting card drag reordering and stage transfers with drop target previews.

## Install

```bash
openui add sortable-kanban-column
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `interactions` → subcategory `drag`
- Interaction model: `kanban-card-drag-reorder`
- Visual model: `columnar-swimlane-deck`
- Motion model: `slot-insertion-indicator`
- Semantic purpose: `pipeline-stage-column`

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
