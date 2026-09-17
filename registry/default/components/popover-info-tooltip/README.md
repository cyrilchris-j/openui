# Popover Info Tooltip

An informational tooltip popover displaying extended metadata notes when hovering or clicking help triggers.

## Install

```bash
openui add popover-info-tooltip
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `components` → subcategory `overlays`
- Interaction model: `hover-popover-callout`
- Visual model: `beveled-tooltip-balloon`
- Motion model: `none`
- Semantic purpose: `contextual-info-balloon`

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
