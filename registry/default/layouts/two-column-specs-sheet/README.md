# Two Column Specs Sheet

Clean specification layout for hardware or software documentation with bold key/value grid.

## Install

```bash
openui add two-column-specs-sheet
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `layouts` → subcategory `grids`
- Interaction model: `technical-spec-lookup`
- Visual model: `two-column-key-value-sheet`
- Motion model: `none`
- Semantic purpose: `hardware-specification-sheet`

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
