# Two Tier Header Shell

Double-decker top header with global utility brand bar above and contextual navigation tabs below.

## Install

```bash
openui add two-tier-header-shell
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `layouts` → subcategory `shells`
- Interaction model: `double-decker-navigation`
- Visual model: `stacked-topbar-header`
- Motion model: `none`
- Semantic purpose: `multi-tier-app-header`

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
