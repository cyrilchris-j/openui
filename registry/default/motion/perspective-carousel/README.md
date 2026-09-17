# Perspective Carousel

A 3D revolving cylindrical carousel rotating items across an elliptical perspective plane on click.

## Install

```bash
openui add perspective-carousel
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `motion` → subcategory `transitions`
- Interaction model: `stepped-carousel-rotation`
- Visual model: `cylindrical-ring-array`
- Motion model: `orbital-cylinder-spin`
- Semantic purpose: `3d-product-carousel`

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
