# Card Deck Tabs

Tabbed container layout where tab triggers swap between neatly stacked card sheets.

## Install

```bash
openui add card-deck-tabs
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `layouts` → subcategory `stacks`
- Interaction model: `tab-card-deck-swapping`
- Visual model: `stacked-tab-panels`
- Motion model: `none`
- Semantic purpose: `tabbed-card-workbench`

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
