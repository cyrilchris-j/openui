# Stacked Notification Center

Chronological notification feed with filter tabs and mark-all-read action header.

## Install

```bash
openui add stacked-notification-center
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `layouts` → subcategory `stacks`
- Interaction model: `notification-inbox-scroll`
- Visual model: `stacked-alert-cards`
- Motion model: `none`
- Semantic purpose: `notification-center-layout`

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
