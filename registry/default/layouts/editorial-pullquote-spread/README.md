# Editorial Pullquote Spread

Magazine layout with oversized highlighted pullquote spanning across multi-column article prose.

## Install

```bash
openui add editorial-pullquote-spread
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `layouts` → subcategory `reading`
- Interaction model: `editorial-pullquote-reading`
- Visual model: `oversized-pullquote-banner`
- Motion model: `none`
- Semantic purpose: `editorial-feature-article`

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
