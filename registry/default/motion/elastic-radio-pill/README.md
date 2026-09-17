# Elastic Radio Pill

A segmented radio pill whose active highlight stretches horizontally before snapping into place with spring momentum.

## Install

```bash
openui add elastic-radio-pill
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `motion` → subcategory `controls`
- Interaction model: `radio-select-pill`
- Visual model: `elastic-bounding-capsule`
- Motion model: `viscoelastic-pill-travel`
- Semantic purpose: `segmented-choice-selector`

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
