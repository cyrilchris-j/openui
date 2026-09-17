# Tilt Depth Badge

A compact badge chip computing 3D tilt angles on hover with specular glass highlight reflections.

## Install

```bash
openui add tilt-depth-badge
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `interactions` → subcategory `hover`
- Interaction model: `micro-tilt-tracking`
- Visual model: `chamfered-glass-chip`
- Motion model: `damped-perspective-recline`
- Semantic purpose: `verified-credential-chip`

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
