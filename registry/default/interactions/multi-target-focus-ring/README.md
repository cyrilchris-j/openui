# Multi Target Focus Ring

A roving highlight reticle that glides smoothly across active focal targets with animated geometry resizing.

## Install

```bash
openui add multi-target-focus-ring
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `interactions` → subcategory `selection`
- Interaction model: `roving-focus-navigation`
- Visual model: `geometry-matching-reticle`
- Motion model: `bounding-box-morph-glide`
- Semantic purpose: `focus-indicator-reticle`

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
