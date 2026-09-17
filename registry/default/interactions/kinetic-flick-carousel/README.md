# Kinetic Flick Carousel

A horizontal card carousel responding to pointer flick velocity with simulated inertial drift and boundary bounce.

## Install

```bash
openui add kinetic-flick-carousel
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `interactions` → subcategory `gestures`
- Interaction model: `flick-velocity-carousel`
- Visual model: `kinetic-card-deck-reel`
- Motion model: `momentum-velocity-drift`
- Semantic purpose: `momentum-card-carousel`

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
