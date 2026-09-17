# E-commerce Discount Rule Builder

An automated pricing rule builder supporting conditional thresholds like free shipping above order limits.

## Install

```bash
openui add ecommerce-discount-rule-builder
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `blocks` → subcategory `ecommerce`
- Interaction model: `discount-rule-threshold-builder`
- Visual model: `conditional-rule-logic-card`
- Motion model: `subtle`
- Semantic purpose: `ecommerce-pricing-rules`

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
