# Mobile Push Notification Previewer

A mobile phone frame mockup visualizing iOS and Android push notifications with app badge counter.

## Install

```bash
openui add mobile-push-notification-previewer
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `blocks` → subcategory `mobile`
- Interaction model: `push-notification-preview-toggle`
- Visual model: `smartphone-lockscreen-notification-mockup`
- Motion model: `subtle`
- Semantic purpose: `mobile-notification-preview`

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
