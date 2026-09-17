# Honeycomb Hex Lattice

Repeating geometric hexagon tessellation pattern creating a structured honeycomb grid.

## Install

```bash
openui add honeycomb-hex-lattice
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `backgrounds` → subcategory `patterns`
- Interaction model: `passive-tessellation-canvas`
- Visual model: `hexagonal-tessellation`
- Motion model: `none`
- Semantic purpose: `honeycomb-structure-backdrop`

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
