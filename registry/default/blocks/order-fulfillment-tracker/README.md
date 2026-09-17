# Order Fulfillment Tracker

A tracking status workbench showing delivery timeline, courier coordinates, and itemized packages.

## Install

```bash
openui add order-fulfillment-tracker
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `blocks` → subcategory `orders`
- Interaction model: `shipment-tracking-stepper`
- Visual model: `package-fulfillment-timeline`
- Motion model: `subtle`
- Semantic purpose: `ecommerce-fulfillment-status`

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
