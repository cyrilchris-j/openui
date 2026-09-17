# Cookie Preferences Dialog

A granular privacy preference center with category switches for essential, functional, and analytical data.

## Install

```bash
openui add cookie-preferences-dialog
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `blocks` → subcategory `privacy`
- Interaction model: `privacy-category-consent-toggles`
- Visual model: `granular-cookie-preference-panel`
- Motion model: `subtle`
- Semantic purpose: `gdpr-consent-management`

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
