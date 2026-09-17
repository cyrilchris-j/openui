# Interactive Code Fold

A syntax code container allowing nested blocks to fold and reveal on click with line range indicators.

## Install

```bash
openui add interactive-code-fold
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `interactions` → subcategory `keyboard`
- Interaction model: `gutter-fold-toggle`
- Visual model: `numbered-syntax-gutter`
- Motion model: `discrete-line-elision`
- Semantic purpose: `code-block-folder`

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
