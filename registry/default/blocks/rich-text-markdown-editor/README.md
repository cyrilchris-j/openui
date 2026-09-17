# Rich Text Markdown Editor

A dual-pane markdown document authoring tool with formatting toolbar buttons and live preview pane.

## Install

```bash
openui add rich-text-markdown-editor
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `blocks` → subcategory `editor`
- Interaction model: `markdown-live-preview-split`
- Visual model: `dual-pane-document-editor`
- Motion model: `none`
- Semantic purpose: `markdown-document-authoring`

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
