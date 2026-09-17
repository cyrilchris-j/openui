# Interactive Color Palette Bar

A swatch ribbon allowing rapid clipboard copying of theme hex values with instant visual feedback.

## Install

```bash
openui add interactive-color-palette-bar
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `interactions` → subcategory `feedback`
- Interaction model: `click-swatch-copy-action`
- Visual model: `partitioned-hex-ribbon`
- Motion model: `transient-badge-alert`
- Semantic purpose: `color-clipboard-copy-tray`

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
