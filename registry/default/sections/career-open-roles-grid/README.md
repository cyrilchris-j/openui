# Career Open Roles Grid

A recruitment job opening board with department filters, location tags, and interactive apply modals.

## Install

```bash
openui add career-open-roles-grid
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `sections` → subcategory `careers`
- Interaction model: `career-open-roles-grid-interaction`
- Visual model: `career-open-roles-grid-visual`
- Motion model: `subtle`
- Semantic purpose: `career-open-roles-grid-section`

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
