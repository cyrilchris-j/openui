# Credit Card Input

Segmented credit card entry with card issuer brand indicator, space grouping, and expiry date format.

## Install

```bash
openui add credit-card-input
```

Dependencies: lucide-react.

## What makes it distinct

- Category: `components` → subcategory `forms`
- Interaction model: `formatted-numeric-card-entry`
- Visual model: `card-brand-badge-field`
- Motion model: `none`
- Semantic purpose: `payment-card-input`

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
