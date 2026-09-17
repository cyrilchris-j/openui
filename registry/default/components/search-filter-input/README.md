# Search Filter Input

An input field with search magnifying glass prefix, clear button, and keyboard shortcut badge affordance.

## Install

```bash
openui add search-filter-input
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `components` → subcategory `inputs`
- Interaction model: `input-field-query-entry`
- Visual model: `prefixed-search-chassis`
- Motion model: `none`
- Semantic purpose: `search-query-field`

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
