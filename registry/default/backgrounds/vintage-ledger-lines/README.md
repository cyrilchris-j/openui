# Vintage Ledger Lines

Classic double-ruled accounting book ledger lines with vertical currency column rules.

## Install

```bash
openui add vintage-ledger-lines
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `backgrounds` → subcategory `patterns`
- Interaction model: `passive-accounting-ledger`
- Visual model: `double-ruled-columns`
- Motion model: `none`
- Semantic purpose: `accounting-ledger-texture`

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
