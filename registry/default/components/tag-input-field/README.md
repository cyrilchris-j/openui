# Tag Input Field

An input container creating removable keyword tag pills upon enter key press or comma delimiter.

## Install

```bash
openui add tag-input-field
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `components` → subcategory `inputs`
- Interaction model: `tag-creation-entry`
- Visual model: `pill-chip-input-tray`
- Motion model: `none`
- Semantic purpose: `keyword-tag-creator`

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
