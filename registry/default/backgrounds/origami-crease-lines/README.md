# Origami Crease Lines

Geometric folding crease lines inspired by Japanese Miura-ori paper engineering patterns.

## Install

```bash
openui add origami-crease-lines
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `backgrounds` → subcategory `patterns`
- Interaction model: `passive-crease-texture`
- Visual model: `angled-folding-creases`
- Motion model: `none`
- Semantic purpose: `paper-folding-geometry`

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
