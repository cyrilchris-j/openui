# Keyboard List Navigation

A vertical record feed navigable smoothly via keyboard arrow keys with instantaneous active highlight styling.

## Install

```bash
openui add keyboard-list-navigation
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `interactions` → subcategory `keyboard`
- Interaction model: `arrow-key-list-selection`
- Visual model: `highlighted-row-matrix`
- Motion model: `stepwise-index-handoff`
- Semantic purpose: `keyboard-row-navigator`

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
