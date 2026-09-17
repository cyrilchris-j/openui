# Staggered Avatar Fan

A compact deck of overlapping user avatars that fans out radially on hover with proportional rotational offsets.

## Install

```bash
openui add staggered-avatar-fan
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `motion` → subcategory `gestures`
- Interaction model: `hover-radial-spread`
- Visual model: `fanned-playing-card-deck`
- Motion model: `angular-stagger-fanning`
- Semantic purpose: `collaborator-fanout-deck`

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
