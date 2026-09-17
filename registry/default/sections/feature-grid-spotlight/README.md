# Feature Grid Spotlight

A 3x2 interactive feature grid with dynamic cursor hover spotlighting, category tags, and expandable detail states.

## Install

```bash
openui add feature-grid-spotlight
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `sections` → subcategory `feature`
- Interaction model: `feature-grid-spotlight-interaction`
- Visual model: `feature-grid-spotlight-visual`
- Motion model: `subtle`
- Semantic purpose: `feature-grid-spotlight-section`

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
