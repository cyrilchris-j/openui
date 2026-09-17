# File Tree View

A directory tree explorer displaying nested folder structures, chevron disclosure toggles, and file icons.

## Install

```bash
openui add file-tree-view
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `components` → subcategory `navigation`
- Interaction model: `tree-folder-disclosure`
- Visual model: `indented-filesystem-tree`
- Motion model: `none`
- Semantic purpose: `filesystem-tree-viewer`

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
