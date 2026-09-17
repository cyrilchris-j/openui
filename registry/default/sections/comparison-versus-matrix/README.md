# Comparison Versus Matrix

Competitor comparison table contrasting OpenUI's verified architectural registry against generic UI libraries.

## Install

```bash
openui add comparison-versus-matrix
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `sections` → subcategory `comparison`
- Interaction model: `comparative-feature-audit`
- Visual model: `dual-column-versus-matrix`
- Motion model: `none`
- Semantic purpose: `product-differentiation-matrix`

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
