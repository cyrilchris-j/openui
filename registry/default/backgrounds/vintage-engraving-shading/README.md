# Vintage Engraving Shading

Fine steel-plate intaglio banknote engraving lines providing rich classical texture.

## Install

```bash
openui add vintage-engraving-shading
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `backgrounds` → subcategory `patterns`
- Interaction model: `passive-intaglio-engraving`
- Visual model: `variable-frequency-engraving-hatching`
- Motion model: `none`
- Semantic purpose: `banknote-engraving-texture`

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
