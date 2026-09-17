# Documentation Quick Links

A fast navigation strip offering direct deep links into foundational documentation topics.

## Install

```bash
openui add documentation-quick-links
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `sections` → subcategory `documentation`
- Interaction model: `documentation-quick-links-interaction`
- Visual model: `documentation-quick-links-visual`
- Motion model: `subtle`
- Semantic purpose: `documentation-quick-links-section`

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
