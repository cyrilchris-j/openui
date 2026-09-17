# Code Diff Viewer

A line-by-line syntax diff viewer formatting added and deleted lines with green and red gutter tags.

## Install

```bash
openui add code-diff-viewer
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `components` → subcategory `data-display`
- Interaction model: `line-diff-inspection`
- Visual model: `gutter-tagged-diff-block`
- Motion model: `none`
- Semantic purpose: `code-diff-inspector`

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
