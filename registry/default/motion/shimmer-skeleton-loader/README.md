# Shimmer Skeleton Loader

An ethereal wireframe content placeholder swept continuously by an angled light sheen gradient during loading.

## Install

```bash
openui add shimmer-skeleton-loader
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `motion` → subcategory `loaders`
- Interaction model: `continuous-sheen-sweep`
- Visual model: `linear-gradient-sheen`
- Motion model: `constant-velocity-light-sweep`
- Semantic purpose: `skeleton-loading-wireframe`

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
