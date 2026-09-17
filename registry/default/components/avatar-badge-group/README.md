# Avatar Badge Group

A compact overlapping avatar stack with live online presence status dots and overflow collaborator count.

## Install

```bash
openui add avatar-badge-group
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `components` → subcategory `data-display`
- Interaction model: `avatar-cluster-inspection`
- Visual model: `overlapping-avatar-rings`
- Motion model: `micro-avatar-hover-lift`
- Semantic purpose: `team-presence-cluster`

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
