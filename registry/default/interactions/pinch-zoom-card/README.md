# Pinch Zoom Card

An asset card supporting discrete stepped scaling buttons and pointer hover magnification factor.

## Install

```bash
openui add pinch-zoom-card
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `interactions` → subcategory `gestures`
- Interaction model: `stepped-card-scaling`
- Visual model: `zoomable-specimen-slab`
- Motion model: `stepped-scale-magnification`
- Semantic purpose: `zoomable-product-slab`

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
