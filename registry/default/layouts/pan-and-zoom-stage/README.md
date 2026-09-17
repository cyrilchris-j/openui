# Pan and Zoom Stage

Infinite 2D spatial canvas layout with corner mini-map locator viewport radar.

## Install

```bash
openui add pan-and-zoom-stage
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `layouts` → subcategory `shells`
- Interaction model: `spatial-canvas-minimap`
- Visual model: `infinite-stage-with-locator`
- Motion model: `none`
- Semantic purpose: `spatial-node-canvas`

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
