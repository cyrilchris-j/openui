# Developer Sandbox Embed Card

An embeddable code snippet preview card with iframe embed code generator and direct share button.

## Install

```bash
openui add developer-sandbox-embed-card
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `blocks` → subcategory `developer`
- Interaction model: `sandbox-embed-copy-code`
- Visual model: `embed-share-preview-card`
- Motion model: `subtle`
- Semantic purpose: `sandbox-component-embedding`

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
