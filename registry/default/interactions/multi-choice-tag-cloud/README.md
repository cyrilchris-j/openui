# Multi Choice Tag Cloud

A responsive flex pill cluster allowing multi-select filter toggles with active badge count computation.

## Install

```bash
openui add multi-choice-tag-cloud
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `interactions` → subcategory `selection`
- Interaction model: `multi-tag-toggle-selection`
- Visual model: `compact-pill-constellation`
- Motion model: `bistable-pill-invert`
- Semantic purpose: `faceted-filter-cloud`

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
