# Pinned Header Sticky Footer

Viewport application framework with fixed header on top, central scroll area, and bottom action bar.

## Install

```bash
openui add pinned-header-sticky-footer
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `layouts` → subcategory `shells`
- Interaction model: `pinned-header-footer-scroll`
- Visual model: `framed-viewport-shell`
- Motion model: `none`
- Semantic purpose: `viewport-bounded-application-shell`

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
