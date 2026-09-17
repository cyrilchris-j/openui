# Dappled Forest Canopy

Atmospheric sunbeams (crepuscular rays) filtering down through an overhead woodland canopy.

## Install

```bash
openui add dappled-forest-canopy
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `backgrounds` → subcategory `ambient`
- Interaction model: `passive-crepuscular-rays`
- Visual model: `canopy-light-shafts`
- Motion model: `none`
- Semantic purpose: `forest-canopy-sunbeams`

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
