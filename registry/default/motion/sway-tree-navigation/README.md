# Sway Tree Navigation

A nested folder hierarchy where tree branches sway organically with delayed momentum when expanded or hovered.

## Install

```bash
openui add sway-tree-navigation
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `motion` → subcategory `hierarchy`
- Interaction model: `expandable-branch-inspection`
- Visual model: `arborescent-branching-links`
- Motion model: `pendular-harmonic-sway`
- Semantic purpose: `filesystem-tree-browser`

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
