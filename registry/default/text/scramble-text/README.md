# Scramble Text

Text that resolves from character noise to its final content, cycling each position through a glyph pool at its own rate so the reveal sweeps left to right rather than popping.

## Install

```bash
openui add scramble-text
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `text` → subcategory `kinetic`
- Interaction model: `in-view-trigger`
- Visual model: `glyph-pool`
- Motion model: `per-character-resolve`
- Semantic purpose: `heading-reveal`

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
