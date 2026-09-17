# Census Bar Heading

A headline where each word carries a data bar underneath whose width encodes a value — typography and chart fused into one element, so a sentence can literally show its own distribution.

## Install

```bash
openui add census-bar-heading
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `text` → subcategory `data`
- Interaction model: `hover-readout`
- Visual model: `glyph-plus-bar-fusion`
- Motion model: `grow-in-view`
- Semantic purpose: `data-headline`

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
