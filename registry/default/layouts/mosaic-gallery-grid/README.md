# Mosaic Gallery Grid

Staggered geometric visual gallery grid with varied aspect ratio image apertures and hover zoom bounds.

## Install

```bash
openui add mosaic-gallery-grid
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `layouts` → subcategory `grids`
- Interaction model: `mosaic-aperture-presentation`
- Visual model: `staggered-aspect-mosaic`
- Motion model: `none`
- Semantic purpose: `visual-gallery-mosaic`

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
