# Magnetic Cursor Follower

A trailing fluid pointer node that elongates along its velocity vector when mouse moves fast.

## Install

```bash
openui add magnetic-cursor-follower
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `motion` → subcategory `cursor`
- Interaction model: `vector-velocity-follower`
- Visual model: `elongating-liquid-droplet`
- Motion model: `lagged-orientation-spring`
- Semantic purpose: `velocity-cursor-trail`

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
