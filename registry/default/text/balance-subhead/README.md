# Balance Subhead

A subhead that uses text-wrap: balance with a JS fallback that greedily evens line lengths for older engines — ragged edges tamed typographically, with a live before/after toggle for teaching the difference.

## Install

```bash
openui add balance-subhead
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `text` → subcategory `editorial`
- Interaction model: `toggle-compare`
- Visual model: `line-length-optimiser`
- Motion model: `none`
- Semantic purpose: `subhead-setting`

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
