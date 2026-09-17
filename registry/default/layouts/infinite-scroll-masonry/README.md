# Infinite Scroll Masonry

Responsive multi-column image masonry grid with loading indicator spinner at the foot.

## Install

```bash
openui add infinite-scroll-masonry
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `layouts` → subcategory `grids`
- Interaction model: `infinite-scroll-masonry`
- Visual model: `waterfall-image-columns`
- Motion model: `none`
- Semantic purpose: `infinite-image-masonry`

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
