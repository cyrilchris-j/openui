# Golden Ratio Split

Proportional layout based on the classic 1.618 golden ratio for natural visual balance.

## Install

```bash
openui add golden-ratio-split
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `layouts` → subcategory `splits`
- Interaction model: `golden-ratio-balance`
- Visual model: `phi-proportional-split`
- Motion model: `none`
- Semantic purpose: `harmonic-golden-split`

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
