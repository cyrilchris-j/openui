# Code Terminal Block

A dark terminal console output box displaying terminal prompt and executed output lines.

## Install

```bash
openui add code-terminal-block
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `components` → subcategory `data-display`
- Interaction model: `passive-terminal-log`
- Visual model: `dark-console-chassis`
- Motion model: `none`
- Semantic purpose: `console-log-display`

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
