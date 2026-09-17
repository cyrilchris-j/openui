# Split Action Dialog

Two-column modal dialog shell with brand illustration on left and action form on right.

## Install

```bash
openui add split-action-dialog
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `layouts` → subcategory `splits`
- Interaction model: `split-dialog-interaction`
- Visual model: `dual-column-modal`
- Motion model: `none`
- Semantic purpose: `dialog-action-shell`

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
