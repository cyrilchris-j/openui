# Zoomable Image Lightbox

A media preview container that transitions into an enlarged lightbox overlay focusing detail on click.

## Install

```bash
openui add zoomable-image-lightbox
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `interactions` → subcategory `hover`
- Interaction model: `click-zoom-lightbox-transition`
- Visual model: `frameless-lightbox-viewport`
- Motion model: `bounding-box-scale-transition`
- Semantic purpose: `media-inspection-lightbox`

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
