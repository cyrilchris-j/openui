# Code Snippet Notebook

An interactive computational notebook block with executable code cells, markdown blocks, and output preview.

## Install

```bash
openui add code-snippet-notebook
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `blocks` → subcategory `developer`
- Interaction model: `notebook-code-cell-execution`
- Visual model: `executable-snippet-workbook`
- Motion model: `none`
- Semantic purpose: `interactive-code-notebook`

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
