# Tag Filter Group

A multi-tag filter group providing active badge highlights on toggle.

## Install

```bash
openui add tag-filter-group
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `components` → subcategory `controls`
- Interaction model: `tag-group-filtering`
- Visual model: `compact-tag-pills`
- Motion model: `none`
- Semantic purpose: `catalog-tag-filter`

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
