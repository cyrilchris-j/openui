# Integrations Marketplace Grid

An ecosystem catalog showcasing third-party software connections with install status and OAuth triggers.

## Install

```bash
openui add integrations-marketplace-grid
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `blocks` → subcategory `integrations`
- Interaction model: `app-integration-connect-toggle`
- Visual model: `marketplace-app-catalog-cards`
- Motion model: `subtle`
- Semantic purpose: `third-party-app-marketplace`

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
