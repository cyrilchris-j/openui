# Diagonal Stripes Pattern

Ultra-fine minimal 45-degree pinstripes with high-contrast subtle rhythm.

## Install

```bash
openui add diagonal-stripes-pattern
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `backgrounds` → subcategory `patterns`
- Interaction model: `passive-pinstripe-backdrop`
- Visual model: `fine-diagonal-striping`
- Motion model: `none`
- Semantic purpose: `minimalist-stripe-texture`

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
