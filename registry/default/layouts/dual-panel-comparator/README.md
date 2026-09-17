# Dual Panel Comparator

Side-by-side comparison layout for diffs, AB variants, or before-and-after evaluations.

## Install

```bash
openui add dual-panel-comparator
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `layouts` → subcategory `splits`
- Interaction model: `side-by-side-comparison`
- Visual model: `symmetric-dual-panel`
- Motion model: `none`
- Semantic purpose: `entity-comparison-view`

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
