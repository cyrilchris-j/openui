# Smart Search Command Palette

A keyboard-accessible modal command palette supporting fuzzy action execution and shortcut cues.

## Install

```bash
openui add smart-search-command-palette
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `blocks` → subcategory `search`
- Interaction model: `fuzzy-command-palette-keyboard-nav`
- Visual model: `floating-omnisearch-modal`
- Motion model: `subtle`
- Semantic purpose: `global-action-launcher`

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
