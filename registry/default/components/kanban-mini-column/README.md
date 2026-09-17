# Kanban Mini Column

Streamlined single-column task rack with item count pill, checkable items, and quick-add inline input.

## Install

```bash
openui add kanban-mini-column
```

Dependencies: lucide-react.

## What makes it distinct

- Category: `components` → subcategory `data-display`
- Interaction model: `in-situ-task-addition-and-toggle`
- Visual model: `vertical-kanban-lane`
- Motion model: `none`
- Semantic purpose: `lightweight-task-column`

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
