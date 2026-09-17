# Two Tier Footer Matrix

Enterprise site footer with comprehensive multi-column link directory and bottom copyright/status bar.

## Install

```bash
openui add two-tier-footer-matrix
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `layouts` → subcategory `shells`
- Interaction model: `sitemap-link-navigation`
- Visual model: `two-tier-link-matrix-footer`
- Motion model: `none`
- Semantic purpose: `global-sitemap-footer`

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
