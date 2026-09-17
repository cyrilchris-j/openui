# TF Auto Emphasis

Automatic emphasis by term frequency: words repeated in the passage get progressively bolder, so the vocabulary that carries the text rises to the surface — a document outline you can see inside a paragraph.

## Install

```bash
openui add tf-auto-emphasis
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `text` → subcategory `data`
- Interaction model: `static`
- Visual model: `frequency-weighted-weights`
- Motion model: `none`
- Semantic purpose: `vocabulary-surface`

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
