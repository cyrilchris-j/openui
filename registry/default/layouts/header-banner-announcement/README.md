# Header Banner Announcement

Dismissable high-visibility notice banner pinned directly above the primary site navigation header.

## Install

```bash
openui add header-banner-announcement
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `layouts` → subcategory `shells`
- Interaction model: `top-announcement-dismissal`
- Visual model: `stacked-banner-and-navbar`
- Motion model: `none`
- Semantic purpose: `global-announcement-shell`

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
