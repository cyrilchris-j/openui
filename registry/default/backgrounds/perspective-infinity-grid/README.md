# Perspective Infinity Grid

Classic 80s synthwave perspective vanishing point wireframe plane receding into the horizon.

## Install

```bash
openui add perspective-infinity-grid
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `backgrounds` → subcategory `canvases`
- Interaction model: `passive-perspective-wireframe`
- Visual model: `vanishing-point-groundplane`
- Motion model: `none`
- Semantic purpose: `synthwave-horizon-grid`

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
