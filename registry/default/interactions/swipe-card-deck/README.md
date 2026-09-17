# Swipe Card Deck

A deck of stacked cards that can be dismissed by swiping left or right with angular velocity feedback.

## Install

```bash
openui add swipe-card-deck
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `interactions` → subcategory `gestures`
- Interaction model: `lateral-deck-decision-swipe`
- Visual model: `bipartite-decision-card`
- Motion model: `angular-trajectory-ejection`
- Semantic purpose: `decision-card-swiper`

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
