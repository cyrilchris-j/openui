# Mega Sitemap Footer

A comprehensive multi-column site directory footer with legal links, social handles, and system status indicator.

## Install

```bash
openui add mega-sitemap-footer
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `sections` → subcategory `navigation`
- Interaction model: `mega-sitemap-footer-interaction`
- Visual model: `mega-sitemap-footer-visual`
- Motion model: `subtle`
- Semantic purpose: `mega-sitemap-footer-section`

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
