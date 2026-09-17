# Career Benefits Perks

An employee value proposition grid displaying health coverage, remote stipends, and learning budgets.

## Install

```bash
openui add career-benefits-perks
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `sections` → subcategory `careers`
- Interaction model: `career-benefits-perks-interaction`
- Visual model: `career-benefits-perks-visual`
- Motion model: `subtle`
- Semantic purpose: `career-benefits-perks-section`

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
