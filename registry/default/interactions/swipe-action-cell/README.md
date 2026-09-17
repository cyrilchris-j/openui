# Swipe Action Cell

A mobile-style list row that reveals quick delete and pin action drawers when swiped horizontally with rubberband drag bounds.

## Install

```bash
openui add swipe-action-cell
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `interactions` → subcategory `gestures`
- Interaction model: `lateral-horizontal-swipe`
- Visual model: `bipartite-action-underlay`
- Motion model: `bounded-horizontal-displacement`
- Semantic purpose: `swipe-action-list-cell`

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
