# E-commerce Checkout Wizard

A three-phase transaction wizard covering shipping address, payment method selection, and itemized order summary.

## Install

```bash
openui add ecommerce-checkout-wizard
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `blocks` → subcategory `ecommerce`
- Interaction model: `stepper-form-checkout-validation`
- Visual model: `cart-and-payment-summary-wizard`
- Motion model: `subtle`
- Semantic purpose: `transactional-checkout-flow`

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
