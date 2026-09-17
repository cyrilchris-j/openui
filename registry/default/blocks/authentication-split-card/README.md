# Authentication Split Card

A dual-mode authentication card supporting sign-in, account creation, OAuth social connectors, and magic links.

## Install

```bash
openui add authentication-split-card
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `blocks` → subcategory `auth`
- Interaction model: `tabbed-auth-mode-switch`
- Visual model: `centered-split-form-card`
- Motion model: `subtle`
- Semantic purpose: `user-identity-access`

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
