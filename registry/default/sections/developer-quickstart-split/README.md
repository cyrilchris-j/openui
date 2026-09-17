# Developer Quickstart Split

A two-column section pairing developer installation steps with copyable terminal snippets and flags.

## Install

```bash
openui add developer-quickstart-split
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `sections` → subcategory `developer`
- Interaction model: `developer-quickstart-split-interaction`
- Visual model: `developer-quickstart-split-visual`
- Motion model: `subtle`
- Semantic purpose: `developer-quickstart-split-section`

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
