# Multi-tenant Organization Switcher

An enterprise workspace dropdown selector supporting team switching, plan badges, and tenant creation.

## Install

```bash
openui add multi-tenant-organization-switcher
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `blocks` → subcategory `navigation`
- Interaction model: `organization-tenant-selection`
- Visual model: `multitenant-workspace-dropdown`
- Motion model: `subtle`
- Semantic purpose: `organization-context-switching`

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
