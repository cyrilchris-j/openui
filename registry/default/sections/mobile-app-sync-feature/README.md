# Mobile App Sync Feature

An omnichannel app showcase card highlighting iOS and Android synchronization with QR code download.

## Install

```bash
openui add mobile-app-sync-feature
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `sections` → subcategory `mobile`
- Interaction model: `mobile-app-sync-feature-interaction`
- Visual model: `mobile-app-sync-feature-visual`
- Motion model: `subtle`
- Semantic purpose: `mobile-app-sync-feature-section`

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
