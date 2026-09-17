# Measuring Tape Hover

Hover any word and a measuring tape slides out beneath it showing its rendered width in px and ch — a debugging instrument for kerning obsessives, implemented with real getBoundingClientRect measurement per word.

## Install

```bash
openui add measuring-tape-hover
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `text` → subcategory `technical`
- Interaction model: `hover-measure`
- Visual model: `width-callout-ruler`
- Motion model: `none`
- Semantic purpose: `type-debugging`

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
