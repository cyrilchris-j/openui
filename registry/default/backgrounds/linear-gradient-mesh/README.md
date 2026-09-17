# Linear Gradient Mesh

Smooth 4-corner multi-radial CSS mesh gradient blend for soft colorful backdrop glow.

## Install

```bash
openui add linear-gradient-mesh
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `backgrounds` → subcategory `ambient`
- Interaction model: `passive-gradient-backdrop`
- Visual model: `four-corner-mesh-blend`
- Motion model: `none`
- Semantic purpose: `modern-mesh-gradient`

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
