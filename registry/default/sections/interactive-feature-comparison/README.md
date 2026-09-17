# Interactive Feature Comparison

A comprehensive side-by-side comparison table contrasting OpenUI with legacy UI libraries across specs.

## Install

```bash
openui add interactive-feature-comparison
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `sections` → subcategory `comparison`
- Interaction model: `interactive-feature-comparison-interaction`
- Visual model: `interactive-feature-comparison-visual`
- Motion model: `subtle`
- Semantic purpose: `interactive-feature-comparison-section`

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
