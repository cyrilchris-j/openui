# Command Palette Search

A modal command palette allowing instantaneous fuzzy searching and keyboard navigation of registered actions.

## Install

```bash
openui add command-palette-search
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `interactions` → subcategory `keyboard`
- Interaction model: `fuzzy-search-keyboard-indexing`
- Visual model: `modal-command-sheet`
- Motion model: `instantaneous-filter-reindexing`
- Semantic purpose: `spotlight-action-invoker`

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
