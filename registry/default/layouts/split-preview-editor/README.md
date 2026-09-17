# Split Preview Editor

Two-column side-by-side interactive playground with code editor on left and live preview on right.

## Install

```bash
openui add split-preview-editor
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `layouts` → subcategory `splits`
- Interaction model: `split-code-and-preview`
- Visual model: `code-preview-dual-pane`
- Motion model: `none`
- Semantic purpose: `interactive-code-playground`

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
