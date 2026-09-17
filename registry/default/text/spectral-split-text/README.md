# Spectral Split Text

Two chromatic copies of the headline offset in opposing directions with screen/ multiply blend modes, producing a prism-split edge that intensifies as the offset grows — chromatic aberration as a dial.

## Install

```bash
openui add spectral-split-text
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `text` → subcategory `paint`
- Interaction model: `offset-dial`
- Visual model: `dual-blend-copies`
- Motion model: `none`
- Semantic purpose: `display-accent`

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
