# Code Token Typeset

Inline code typeset as a first-class citizen: a tiny tokenizer (keywords, strings, comments, numbers) renders spans with typographic detail most highlighters skip — tabular numerals, zero-width joiners and per-token kerning fixes.

## Install

```bash
openui add code-token-typeset
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `text` → subcategory `technical`
- Interaction model: `static`
- Visual model: `token-span-typesetting`
- Motion model: `none`
- Semantic purpose: `code-presentation`

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
