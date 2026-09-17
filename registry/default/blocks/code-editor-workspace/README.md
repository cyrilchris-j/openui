# Code Editor Workspace

A developer code workspace featuring numbered lines, language selection, run action, and simulated execution console.

## Install

```bash
openui add code-editor-workspace
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `blocks` → subcategory `developer`
- Interaction model: `code-editing-and-terminal-output`
- Visual model: `syntax-editor-with-console-drawer`
- Motion model: `none`
- Semantic purpose: `developer-code-sandbox`

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
