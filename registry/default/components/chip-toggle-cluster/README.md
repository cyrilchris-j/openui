# Chip Toggle Cluster

An array of selectable category chips with active counts and toggle selection states.

## Install

```bash
openui add chip-toggle-cluster
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `components` → subcategory `controls`
- Interaction model: `multi-chip-toggle`
- Visual model: `horizontal-pill-constellation`
- Motion model: `none`
- Semantic purpose: `facet-filter-chips`

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
