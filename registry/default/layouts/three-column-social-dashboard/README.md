# Three Column Social Dashboard

Three-tier social dashboard layout: user mini profile on left, central stream, and right suggestions.

## Install

```bash
openui add three-column-social-dashboard
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `layouts` → subcategory `shells`
- Interaction model: `three-column-social-feed`
- Visual model: `profile-feed-suggestions-triptych`
- Motion model: `none`
- Semantic purpose: `community-feed-dashboard`

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
