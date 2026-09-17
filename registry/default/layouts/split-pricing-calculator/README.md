# Split Pricing Calculator

Interactive billing estimator: range slider inputs on left with dynamic calculated total breakdown on right.

## Install

```bash
openui add split-pricing-calculator
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `layouts` → subcategory `splits`
- Interaction model: `interactive-cost-estimation`
- Visual model: `slider-and-cost-receipt`
- Motion model: `none`
- Semantic purpose: `pricing-estimation-workbench`

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
