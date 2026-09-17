# Minimalist Footer Spread

Complete site footer with brand declaration, categorical link columns, license metadata, and status beacon.

## Install

```bash
openui add minimalist-footer-spread
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `sections` → subcategory `footer`
- Interaction model: `footer-sitemap-navigation`
- Visual model: `four-column-footer-spread`
- Motion model: `none`
- Semantic purpose: `site-terminal-footer`

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
