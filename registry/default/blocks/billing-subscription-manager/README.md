# Billing Subscription Manager

A subscription settings console showing active plan tier, billing cycle renewal, payment method, and invoice history.

## Install

```bash
openui add billing-subscription-manager
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `blocks` → subcategory `billing`
- Interaction model: `plan-management-and-invoicing`
- Visual model: `tiered-settings-card-stack`
- Motion model: `none`
- Semantic purpose: `financial-subscription-console`

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
