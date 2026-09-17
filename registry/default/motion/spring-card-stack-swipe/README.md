# Spring Card Stack Swipe

A deck of cards that can be dismissed left or right with velocity swipe detection and spring restitution.

## Install

```bash
openui add spring-card-stack-swipe
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `motion` → subcategory `gestures`
- Interaction model: `bistable-swipe-dismiss`
- Visual model: `deck-playing-card`
- Motion model: `angular-velocity-flyaway`
- Semantic purpose: `deck-dismiss-evaluator`

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
