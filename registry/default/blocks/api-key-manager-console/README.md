# API Key Manager Console

A secret key lifecycle manager featuring token masking, creation modals, copy confirmation, and revocation.

## Install

```bash
openui add api-key-manager-console
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `blocks` → subcategory `security`
- Interaction model: `token-generation-and-revocation`
- Visual model: `security-credentials-console`
- Motion model: `subtle`
- Semantic purpose: `api-credential-lifecycle`

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
