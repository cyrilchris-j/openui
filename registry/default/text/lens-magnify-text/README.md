# Lens Magnify Text

A circular lens that magnifies the text beneath it using a duplicated, scaled copy clipped to a circle that tracks the pointer — a magnifier, not a highlight, with true enlargement of glyph detail.

## Install

```bash
openui add lens-magnify-text
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `text` → subcategory `interactive`
- Interaction model: `pointer-lens`
- Visual model: `clipped-scale-copy`
- Motion model: `direct-follow`
- Semantic purpose: `inspection`

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
