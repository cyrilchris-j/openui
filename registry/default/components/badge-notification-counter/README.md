# Badge Notification Counter

A compact count badge pill capping high values with plus suffixes for unread notifications.

## Install

```bash
openui add badge-notification-counter
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `components` → subcategory `data-display`
- Interaction model: `notification-count-badge`
- Visual model: `circular-badge-pill`
- Motion model: `none`
- Semantic purpose: `unread-notification-badge`

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
