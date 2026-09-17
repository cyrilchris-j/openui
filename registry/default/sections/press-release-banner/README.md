# Press Release Banner

An announcement strip with news badge, press headline, read link, and dismiss action.

## Install

```bash
openui add press-release-banner
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `sections` → subcategory `announcements`
- Interaction model: `press-release-banner-interaction`
- Visual model: `press-release-banner-visual`
- Motion model: `subtle`
- Semantic purpose: `press-release-banner-section`

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
