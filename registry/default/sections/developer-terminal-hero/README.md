# Developer Terminal Hero

Hero layout with code terminal on right showing instant pnpm install and validation commands.

## Install

```bash
openui add developer-terminal-hero
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `sections` → subcategory `heroes`
- Interaction model: `copyable-terminal-hero`
- Visual model: `code-terminal-landing-hero`
- Motion model: `none`
- Semantic purpose: `developer-cli-hero`

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
