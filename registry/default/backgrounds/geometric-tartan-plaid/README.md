# Geometric Tartan Plaid

Scottish woven tartan plaid with layered intersecting warp and weft yarn bands.

## Install

```bash
openui add geometric-tartan-plaid
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `backgrounds` → subcategory `patterns`
- Interaction model: `passive-tartan-weave`
- Visual model: `criss-cross-yarn-bands`
- Motion model: `none`
- Semantic purpose: `heritage-tartan-pattern`

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
