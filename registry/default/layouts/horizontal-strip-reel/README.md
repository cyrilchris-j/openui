# Horizontal Strip Reel

Horizontal snap-scrolling card strip with peek margins and smooth momentum scrolling.

## Install

```bash
openui add horizontal-strip-reel
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `layouts` → subcategory `grids`
- Interaction model: `horizontal-momentum-scroll`
- Visual model: `snap-card-strip-reel`
- Motion model: `none`
- Semantic purpose: `horizontal-media-gallery`

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
