# Developer Sandbox Preview

An interactive code previewer section with tabbed code and live view toggles.

## Install

```bash
openui add developer-sandbox-preview
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `sections` → subcategory `developer`
- Interaction model: `developer-sandbox-preview-interaction`
- Visual model: `developer-sandbox-preview-visual`
- Motion model: `subtle`
- Semantic purpose: `developer-sandbox-preview-section`

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
