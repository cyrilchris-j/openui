# Fullscreen Canvas Overlay

Full-viewport interactive graphic canvas with floating HUD panels pinned to four corners.

## Install

```bash
openui add fullscreen-canvas-overlay
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `layouts` → subcategory `shells`
- Interaction model: `corner-hud-over-canvas`
- Visual model: `four-corner-hud-stage`
- Motion model: `none`
- Semantic purpose: `canvas-hud-workspace`

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
