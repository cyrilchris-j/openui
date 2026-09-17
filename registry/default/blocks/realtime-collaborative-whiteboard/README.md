# Realtime Collaborative Whiteboard

A collaborative drawing whiteboard mockup showing active cursor presences, sticky note objects, and shape tools.

## Install

```bash
openui add realtime-collaborative-whiteboard
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `blocks` → subcategory `collaboration`
- Interaction model: `canvas-collaboration-cursor-tracking`
- Visual model: `virtual-whiteboard-infinite-canvas`
- Motion model: `subtle`
- Semantic purpose: `collaborative-visual-whiteboard`

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
