# Color Palette Strip

A continuous color tone preview strip showing primary, secondary, and accent theme tokens.

## Install

```bash
openui add color-palette-strip
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `components` → subcategory `data-display`
- Interaction model: `passive-color-strip`
- Visual model: `gradient-token-strip`
- Motion model: `none`
- Semantic purpose: `color-theme-token-strip`

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
