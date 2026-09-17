# Inline Diff Markup

Renders edits the way copyeditors mark them: insertions underlined in green, deletions struck in red — computed from a real word-level LCS diff, not hand-authored spans, so any two strings can be compared.

## Install

```bash
openui add inline-diff-markup
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `text` → subcategory `data`
- Interaction model: `static`
- Visual model: `lcs-word-diff`
- Motion model: `none`
- Semantic purpose: `change-review`

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
