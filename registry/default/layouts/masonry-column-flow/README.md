# Masonry Column Flow

Pinterest-style cascading multi-column masonry pin-board layout with variable height item cards.

## Install

```bash
openui add masonry-column-flow
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `layouts` → subcategory `grids`
- Interaction model: `cascading-pinboard-scroll`
- Visual model: `variable-height-masonry`
- Motion model: `none`
- Semantic purpose: `masonry-pinboard-gallery`

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
