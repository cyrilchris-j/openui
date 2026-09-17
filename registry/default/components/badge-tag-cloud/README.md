# Badge Tag Cloud

A wrapping cloud of metadata badge chips providing taxonomy labels.

## Install

```bash
openui add badge-tag-cloud
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `components` → subcategory `data-display`
- Interaction model: `passive-tag-cloud`
- Visual model: `wrapping-pill-matrix`
- Motion model: `none`
- Semantic purpose: `taxonomy-cloud-display`

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
