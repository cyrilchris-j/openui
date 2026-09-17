# Topographic Contour Lines

Generative SVG topographic elevation contours reminiscent of geographic cartography maps.

## Install

```bash
openui add topographic-contour-lines
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `backgrounds` → subcategory `patterns`
- Interaction model: `passive-contour-backdrop`
- Visual model: `curved-elevation-isobars`
- Motion model: `none`
- Semantic purpose: `cartographic-elevation-texture`

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
