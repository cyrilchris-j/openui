# Liquid Card Expand

A card thumbnail that morphs dynamically into an expanded modal sheet with shared layout boundary transitions.

## Install

```bash
openui add liquid-card-expand
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `motion` → subcategory `transitions`
- Interaction model: `expand-modal-transition`
- Visual model: `bounding-box-morph`
- Motion model: `interpolated-geometry-spring`
- Semantic purpose: `shared-element-expander`

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
