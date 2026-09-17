# Swatch Words

Colour names rendered in their own colour with a click-to-copy chip: the word is the swatch, a miniature circular chip rides the baseline, and clicking copies the hex with a small toast — a palette you can read.

## Install

```bash
openui add swatch-words
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `text` → subcategory `data`
- Interaction model: `click-copy`
- Visual model: `self-coloured-tokens`
- Motion model: `toast-confirm`
- Semantic purpose: `palette-display`

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
