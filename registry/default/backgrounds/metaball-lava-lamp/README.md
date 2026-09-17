# Metaball Lava Lamp

Rising and falling viscous wax liquid metaball blobs floating smoothly inside a heated column.

## Install

```bash
openui add metaball-lava-lamp
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `backgrounds` → subcategory `canvases`
- Interaction model: `passive-canvas-lava`
- Visual model: `buoyant-wax-droplets`
- Motion model: `convective-thermal-buoyancy`
- Semantic purpose: `lava-lamp-ambiance`

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
