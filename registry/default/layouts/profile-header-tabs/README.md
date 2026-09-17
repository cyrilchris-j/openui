# Profile Header Tabs

User account profile layout with wide panoramic banner, overlapping avatar badge, and content tabs.

## Install

```bash
openui add profile-header-tabs
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `layouts` → subcategory `shells`
- Interaction model: `profile-banner-tab-navigation`
- Visual model: `panoramic-banner-profile`
- Motion model: `none`
- Semantic purpose: `user-profile-shell`

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
