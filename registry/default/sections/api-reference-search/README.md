# API Reference Search

A fast lookup interface allowing developers to filter endpoints, props, and design tokens.

## Install

```bash
openui add api-reference-search
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `sections` → subcategory `documentation`
- Interaction model: `api-reference-search-interaction`
- Visual model: `api-reference-search-visual`
- Motion model: `subtle`
- Semantic purpose: `api-reference-search-section`

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
