# Product Inventory Catalog

An e-commerce stock management table showing product SKUs, inventory counts, and reorder triggers.

## Install

```bash
openui add product-inventory-catalog
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `blocks` → subcategory `ecommerce`
- Interaction model: `inventory-stock-management`
- Visual model: `product-sku-inventory-table`
- Motion model: `none`
- Semantic purpose: `ecommerce-inventory-catalog`

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
