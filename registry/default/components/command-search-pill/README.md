# Command Search Pill

A search trigger pill showing search icon, placeholder text, and keyboard shortcut badge affordance.

## Install

```bash
openui add command-search-pill
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `components` → subcategory `inputs`
- Interaction model: `search-modal-trigger`
- Visual model: `pill-search-trigger`
- Motion model: `none`
- Semantic purpose: `search-trigger-pill`

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
