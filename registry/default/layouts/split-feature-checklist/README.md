# Split Feature Checklist

Marketing conversion split: high-level elevator pitch on left and checkmarked deliverable list on right.

## Install

```bash
openui add split-feature-checklist
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `layouts` → subcategory `splits`
- Interaction model: `feature-checklist-scan`
- Visual model: `pitch-and-checklist-halves`
- Motion model: `none`
- Semantic purpose: `conversion-feature-checklist`

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
