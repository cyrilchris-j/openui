# Retro CRT Phosphor Grid

Trinitron television aperture grille vertical phosphor stripes with RGB subpixel pattern.

## Install

```bash
openui add retro-crt-phosphor-grid
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `backgrounds` → subcategory `patterns`
- Interaction model: `passive-phosphor-grille`
- Visual model: `vertical-aperture-stripes`
- Motion model: `none`
- Semantic purpose: `trinitron-aperture-grille`

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
