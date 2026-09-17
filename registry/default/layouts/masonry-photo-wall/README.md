# Masonry Photo Wall

Seamless zero-gutter photo grid with dense visual interlocking image apertures.

## Install

```bash
openui add masonry-photo-wall
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `layouts` → subcategory `grids`
- Interaction model: `dense-photowall-mosaic`
- Visual model: `seamless-photo-tessellation`
- Motion model: `none`
- Semantic purpose: `immersive-photo-wall`

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
