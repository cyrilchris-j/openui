# Download App Banner

Mobile application callout section with Apple App Store and Google Play badge triggers.

## Install

```bash
openui add download-app-banner
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `sections` → subcategory `cta`
- Interaction model: `app-store-download-dispatch`
- Visual model: `mobile-app-download-banner`
- Motion model: `none`
- Semantic purpose: `mobile-app-download-callout`

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
