# Reply Tree Thread

Discussion text structured as a tree: replies indent along ruled connector lines that draw in on expand, collapsed branches show reply counts, and the whole thread is keyboard-navigable with arrow keys.

## Install

```bash
openui add reply-tree-thread
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `text` → subcategory `data`
- Interaction model: `expand-collapse-tree`
- Visual model: `ruled-branch-indent`
- Motion model: `connector-draw`
- Semantic purpose: `conversation`

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
