# Drag Reorder List

A vertical list of priorities that can be re-ordered dynamically with pointer dragging and slot insertion placeholders.

## Install

```bash
openui add drag-reorder-list
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `interactions` → subcategory `drag`
- Interaction model: `vertical-drag-sort`
- Visual model: `stacked-reorderable-rows`
- Motion model: `list-slot-insertion-shift`
- Semantic purpose: `priority-task-reorderer`

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
