# Pagination Stepper

A page navigation stepper bar with previous/next buttons and active numeric page pill.

## Install

```bash
openui add pagination-stepper
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `components` → subcategory `navigation`
- Interaction model: `page-index-advancement`
- Visual model: `stepped-pagination-bar`
- Motion model: `stepwise-page-increment`
- Semantic purpose: `table-page-navigator`

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
