# Developer CLI Cheatsheet

A reference card mapping key CLI subcommands, options, and environmental variables.

## Install

```bash
openui add developer-cli-cheatsheet
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `sections` → subcategory `developer`
- Interaction model: `developer-cli-cheatsheet-interaction`
- Visual model: `developer-cli-cheatsheet-visual`
- Motion model: `subtle`
- Semantic purpose: `developer-cli-cheatsheet-section`

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
