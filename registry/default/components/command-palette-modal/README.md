# Command Palette Modal

Spotlight modal launcher with categorized actions, keyboard shortcut navigation, and query filter.

## Install

```bash
openui add command-palette-modal
```

Dependencies: lucide-react.

## What makes it distinct

- Category: `components` → subcategory `navigation`
- Interaction model: `spotlight-dialog-search`
- Visual model: `centered-command-dialog`
- Motion model: `none`
- Semantic purpose: `global-command-launcher`

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
