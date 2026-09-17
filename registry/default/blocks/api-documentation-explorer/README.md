# API Documentation Explorer

An interactive API reference explorer with HTTP method badges (GET, POST), parameter tables, and live response simulation.

## Install

```bash
openui add api-documentation-explorer
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `blocks` → subcategory `documentation`
- Interaction model: `api-endpoint-try-it-out-request`
- Visual model: `openapi-interactive-specification-viewer`
- Motion model: `none`
- Semantic purpose: `api-specification-inspection`

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
