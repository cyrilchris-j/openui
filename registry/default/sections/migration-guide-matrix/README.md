# Migration Guide Matrix

A transition mapping guide comparing old conventions with modern OpenUI patterns.

## Install

```bash
openui add migration-guide-matrix
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `sections` → subcategory `guides`
- Interaction model: `migration-guide-matrix-interaction`
- Visual model: `migration-guide-matrix-visual`
- Motion model: `subtle`
- Semantic purpose: `migration-guide-matrix-section`

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
