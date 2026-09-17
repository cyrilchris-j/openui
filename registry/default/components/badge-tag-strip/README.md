# Badge Tag Strip

A collection of metadata chips displaying category taxonomy tags with color category coding.

## Install

```bash
openui add badge-tag-strip
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `components` → subcategory `data-display`
- Interaction model: `passive-metadata-tags`
- Visual model: `linear-taxonomy-pills`
- Motion model: `none`
- Semantic purpose: `taxonomy-metadata-strip`

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
