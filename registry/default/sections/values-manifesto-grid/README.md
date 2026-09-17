# Values Manifesto Grid

Core architectural principles section: Independence, Mathematical Rigor, and Character.

## Install

```bash
openui add values-manifesto-grid
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `sections` → subcategory `about`
- Interaction model: `manifesto-principles-reading`
- Visual model: `three-column-principles-grid`
- Motion model: `none`
- Semantic purpose: `company-manifesto-section`

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
