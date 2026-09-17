# Pricing Calculator Quote

An enterprise quote estimator calculating multi-seat licenses with dedicated support add-on toggles.

## Install

```bash
openui add pricing-calculator-quote
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `blocks` → subcategory `pricing`
- Interaction model: `quote-cost-calculator`
- Visual model: `enterprise-quote-summary-sheet`
- Motion model: `subtle`
- Semantic purpose: `enterprise-contract-quote`

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
