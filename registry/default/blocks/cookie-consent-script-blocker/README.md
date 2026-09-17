# Cookie Consent Script Blocker

An automated script blocking inspector showing which third-party tags are held pending explicit consent.

## Install

```bash
openui add cookie-consent-script-blocker
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `blocks` → subcategory `privacy`
- Interaction model: `script-dependency-block-audit`
- Visual model: `tag-blocker-status-panel`
- Motion model: `none`
- Semantic purpose: `script-blocking-consent-audit`

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
