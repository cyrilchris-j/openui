# Search Results Grid

Search interface with filter aside on left and responsive results card grid on right.

## Install

```bash
openui add search-results-grid
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `layouts` → subcategory `shells`
- Interaction model: `faceted-search-inspection`
- Visual model: `filter-aside-and-card-results`
- Motion model: `none`
- Semantic purpose: `search-results-viewport`

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
