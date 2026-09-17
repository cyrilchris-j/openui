# Prismatic Caustic Mesh

Chromatic optical glass caustic refractions separating into spectral rainbow beams.

## Install

```bash
openui add prismatic-caustic-mesh
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `backgrounds` → subcategory `ambient`
- Interaction model: `passive-glass-caustics`
- Visual model: `prismatic-chromatic-refraction`
- Motion model: `none`
- Semantic purpose: `crystal-caustics-layer`

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
