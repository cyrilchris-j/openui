# Terminal Split View

Side-by-side dual console panes for monitoring concurrent build logs and server output.

## Install

```bash
openui add terminal-split-view
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `layouts` → subcategory `splits`
- Interaction model: `dual-terminal-monitoring`
- Visual model: `split-console-panes`
- Motion model: `none`
- Semantic purpose: `dual-terminal-console`

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
