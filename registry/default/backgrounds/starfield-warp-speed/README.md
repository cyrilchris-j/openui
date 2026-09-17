# Starfield Warp Speed

Canvas 3D starfield simulation with stars accelerating toward the camera creating a hyperspace warp effect.

## Install

```bash
openui add starfield-warp-speed
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `backgrounds` → subcategory `canvases`
- Interaction model: `passive-canvas-warp`
- Visual model: `radial-hyperspace-streaks`
- Motion model: `center-outward-acceleration`
- Semantic purpose: `hyperspace-travel-canvas`

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
