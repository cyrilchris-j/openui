# Multi Column Directory List

Four-column directory index for organizing extensive rosters of components, tags, or API endpoints.

## Install

```bash
openui add multi-column-directory-list
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `layouts` → subcategory `grids`
- Interaction model: `directory-index-lookup`
- Visual model: `four-column-directory-matrix`
- Motion model: `none`
- Semantic purpose: `directory-index-display`

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
