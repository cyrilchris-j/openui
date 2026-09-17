# Split Spec Comparator

Side-by-side benchmark comparison matrix evaluating framework speed, payload size, and memory usage.

## Install

```bash
openui add split-spec-comparator
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `layouts` → subcategory `splits`
- Interaction model: `benchmark-side-by-side-inspection`
- Visual model: `dual-column-spec-table`
- Motion model: `none`
- Semantic purpose: `benchmark-comparison-table`

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
