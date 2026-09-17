# Press Media Mentions

Curated press clippings and editorial soundbites from leading engineering publications.

## Install

```bash
openui add press-media-mentions
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `sections` → subcategory `social-proof`
- Interaction model: `press-quote-inspection`
- Visual model: `clipping-editorial-grid`
- Motion model: `none`
- Semantic purpose: `press-media-quotes`

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
