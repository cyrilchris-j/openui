# Momentum Flick Card

A card deck element that responds to pointer swipe velocity, flying away when flicked beyond velocity threshold or springing back to center.

## Install

```bash
openui add momentum-flick-card
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `motion` → subcategory `gesture`
- Interaction model: `swipe-throw-gesture`
- Visual model: `stacked-tinder-card`
- Motion model: `velocity-based-ballistic-flight`
- Semantic purpose: `decision-deck-card`

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
