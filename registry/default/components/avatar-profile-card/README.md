# Avatar Profile Card

A user summary card featuring round avatar image, verified badge, and operational role attribution.

## Install

```bash
openui add avatar-profile-card
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `components` → subcategory `cards`
- Interaction model: `user-profile-inspection`
- Visual model: `bordered-profile-card`
- Motion model: `none`
- Semantic purpose: `user-profile-summary-card`

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
