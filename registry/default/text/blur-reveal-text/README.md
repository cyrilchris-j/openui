# Blur Reveal Text

A focus-pull reveal: words start defocused and transparent, then sharpen in reading order with an interleaved delay, using only filter and opacity so layout is stable throughout.

## Install

```bash
openui add blur-reveal-text
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `text` → subcategory `reveal`
- Interaction model: `in-view-trigger`
- Visual model: `filter-sharpen`
- Motion model: `reading-order-stagger`
- Semantic purpose: `intro-copy`

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
