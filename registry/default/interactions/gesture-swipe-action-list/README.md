# Gesture Swipe Action List

A task feed allowing rows to be swiped left for delete or right for complete with color reveal actions.

## Install

```bash
openui add gesture-swipe-action-list
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `interactions` → subcategory `gestures`
- Interaction model: `bidirectional-swipe-action`
- Visual model: `dual-drawer-task-row`
- Motion model: `bidirectional-lateral-drawer`
- Semantic purpose: `task-swipe-completer`

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
