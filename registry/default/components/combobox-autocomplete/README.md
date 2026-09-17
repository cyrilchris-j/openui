# Combobox Autocomplete

A searchable dropdown select combining a text input field with filtered option suggestions.

## Install

```bash
openui add combobox-autocomplete
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `components` → subcategory `inputs`
- Interaction model: `autocomplete-filter-select`
- Visual model: `combobox-anchor-dropdown`
- Motion model: `none`
- Semantic purpose: `autocomplete-search-field`

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
