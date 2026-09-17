# Segmented View Switcher

An icon view switcher toggling presentation between grid, list, and compact modes.

## Install

```bash
openui add segmented-view-switcher
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `components` → subcategory `controls`
- Interaction model: `icon-view-selection`
- Visual model: `tri-state-view-switch`
- Motion model: `none`
- Semantic purpose: `layout-mode-selector`

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
