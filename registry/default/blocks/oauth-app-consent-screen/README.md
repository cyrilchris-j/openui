# OAuth App Consent Screen

An authorization prompt displaying third-party application name, requested permission scopes, and grant actions.

## Install

```bash
openui add oauth-app-consent-screen
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `blocks` → subcategory `auth`
- Interaction model: `oauth-scope-grant-authorization`
- Visual model: `permission-consent-dialog`
- Motion model: `subtle`
- Semantic purpose: `oauth-authorization-consent`

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
