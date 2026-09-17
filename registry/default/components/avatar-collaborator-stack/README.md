# Avatar Collaborator Stack

An overlapping circle avatar deck showing initials of active editors on a shared workspace canvas.

## Install

```bash
openui add avatar-collaborator-stack
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `components` → subcategory `data-display`
- Interaction model: `presence-collaborator-stack`
- Visual model: `overlapping-initials-discs`
- Motion model: `none`
- Semantic purpose: `canvas-collaborator-stack`

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
