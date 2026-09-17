# Dropdown Action Menu

A contextual action menu container providing options with icons, danger states, and divider lines.

## Install

```bash
openui add dropdown-action-menu
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `components` → subcategory `navigation`
- Interaction model: `dropdown-popover-selection`
- Visual model: `bordered-menu-surface`
- Motion model: `popover-appearance-fade`
- Semantic purpose: `popover-action-menu`

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
