# Dropdown Filter Menu

A dropdown menu allowing single selection filter criteria with checkmark state.

## Install

```bash
openui add dropdown-filter-menu
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `components` → subcategory `navigation`
- Interaction model: `dropdown-filter-select`
- Visual model: `popover-filter-menu`
- Motion model: `none`
- Semantic purpose: `catalog-filter-dropdown`

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
