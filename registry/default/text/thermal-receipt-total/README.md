# Thermal Receipt Total

A receipt layout with dot-leader lines between item names and prices, a dashed separator, a double-ruled total, and tabular numerals that keep every currency column aligned — the typography of honest arithmetic.

## Install

```bash
openui add thermal-receipt-total
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `text` → subcategory `data`
- Interaction model: `static`
- Visual model: `dot-leader-columns`
- Motion model: `none`
- Semantic purpose: `itemised-total`

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
