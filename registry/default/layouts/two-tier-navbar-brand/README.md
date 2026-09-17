# Two Tier Navbar Brand

Two-level navigation header with persistent top utility strip and main navigation bar below.

## Install

```bash
openui add two-tier-navbar-brand
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `layouts` → subcategory `shells`
- Interaction model: `two-tier-navbar-navigation`
- Visual model: `double-decker-navbar`
- Motion model: `none`
- Semantic purpose: `global-branding-navbar`

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
