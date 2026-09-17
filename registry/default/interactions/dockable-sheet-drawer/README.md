# Dockable Sheet Drawer

An edge sheet that snaps into docked, peeked, and expanded states via interactive vertical flick dragging.

## Install

```bash
openui add dockable-sheet-drawer
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `interactions` → subcategory `gestures`
- Interaction model: `multi-height-sheet-snap`
- Visual model: `docked-bottom-drawer`
- Motion model: `discrete-height-settle`
- Semantic purpose: `docked-inspector-sheet`

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
