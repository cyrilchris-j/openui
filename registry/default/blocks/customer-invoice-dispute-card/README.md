# Customer Invoice Dispute Card

A financial dispute review panel presenting customer complaint logs, transaction evidence, and refund actions.

## Install

```bash
openui add customer-invoice-dispute-card
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `blocks` → subcategory `billing`
- Interaction model: `dispute-resolution-action`
- Visual model: `invoice-chargeback-detail-card`
- Motion model: `subtle`
- Semantic purpose: `financial-dispute-resolution`

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
