# Split Invoice Ledger

Two-panel accounting billing invoice with client metadata on left and line-item totals on right.

## Install

```bash
openui add split-invoice-ledger
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `layouts` → subcategory `splits`
- Interaction model: `invoice-ledger-inspection`
- Visual model: `dual-column-invoice-sheet`
- Motion model: `none`
- Semantic purpose: `accounting-invoice-display`

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
