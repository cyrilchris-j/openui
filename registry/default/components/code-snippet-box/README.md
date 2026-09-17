# Code Snippet Box

A terminal code block container providing syntax presentation, command copy action, and verified toast state.

## Install

```bash
openui add code-snippet-box
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `components` → subcategory `data-display`
- Interaction model: `code-clipboard-copy`
- Visual model: `dark-terminal-block`
- Motion model: `none`
- Semantic purpose: `command-snippet-display`

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
