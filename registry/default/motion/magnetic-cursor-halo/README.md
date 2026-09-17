# Magnetic Cursor Halo

An ethereal circular reticle that trails pointer coordinates with damped inertia and expands on interactive target hover.

## Install

```bash
openui add magnetic-cursor-halo
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `motion` → subcategory `cursor`
- Interaction model: `pointer-lag-tracking`
- Visual model: `concentric-halo-reticle`
- Motion model: `damped-spring-follower`
- Semantic purpose: `focus-cursor-enhancer`

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
