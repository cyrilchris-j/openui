# Gesture Swipe Carousel

A touch and pointer draggable item reel featuring momentum deceleration and discrete snapping indices.

## Install

```bash
openui add gesture-swipe-carousel
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `interactions` → subcategory `gestures`
- Interaction model: `horizontal-swipe-carousel`
- Visual model: `linear-reel-slides`
- Motion model: `indexed-slide-snap`
- Semantic purpose: `touch-carousel-slider`

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
