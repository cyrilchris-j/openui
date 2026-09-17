# Integration Ecosystem Grid

Grid of supported developer ecosystem tools (Next.js, Vite, Supabase, Tailwind, Figma) with connection status badges.

## Install

```bash
openui add integration-ecosystem-grid
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `sections` → subcategory `integrations`
- Interaction model: `ecosystem-tool-inspection`
- Visual model: `integration-badge-grid`
- Motion model: `none`
- Semantic purpose: `integration-ecosystem-display`

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
