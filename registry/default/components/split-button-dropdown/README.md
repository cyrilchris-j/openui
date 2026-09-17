# Split Button Dropdown

A composite action button with a primary click surface and a distinct chevron dropdown trigger for secondary variants.

## Install

```bash
openui add split-button-dropdown
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `components` → subcategory `controls`
- Interaction model: `split-action-dropdown`
- Visual model: `bipartite-action-capsule`
- Motion model: `none`
- Semantic purpose: `dual-action-split-button`

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
