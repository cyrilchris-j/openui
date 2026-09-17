# Interactive Color Token Previewer

An interactive color swatching utility allowing developers to visualize theme token overrides.

## Install

```bash
openui add interactive-color-token-previewer
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `sections` → subcategory `design-system`
- Interaction model: `interactive-color-token-previewer-interaction`
- Visual model: `interactive-color-token-previewer-visual`
- Motion model: `subtle`
- Semantic purpose: `interactive-color-token-previewer-section`

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
