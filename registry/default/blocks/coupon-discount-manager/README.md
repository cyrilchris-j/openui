# Coupon Discount Manager

An e-commerce promotional discount code creator managing active promo percentages, usages, and expiry dates.

## Install

```bash
openui add coupon-discount-manager
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `blocks` → subcategory `ecommerce`
- Interaction model: `discount-code-creation-and-table`
- Visual model: `promo-coupon-manager`
- Motion model: `subtle`
- Semantic purpose: `ecommerce-coupon-management`

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
