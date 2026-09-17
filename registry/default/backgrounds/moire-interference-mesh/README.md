# Moiré Interference Mesh

Two overlapping slightly rotated line gratings creating an optical moiré ripple pattern.

## Install

```bash
openui add moire-interference-mesh
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `backgrounds` → subcategory `patterns`
- Interaction model: `passive-optical-illusion`
- Visual model: `dual-lattice-moire`
- Motion model: `none`
- Semantic purpose: `optical-moire-effect`

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
