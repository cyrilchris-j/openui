# Compact Widget Dock

Four-column compact widget bar docked to the bottom of the active viewport.

## Install

```bash
openui add compact-widget-dock
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `layouts` → subcategory `shells`
- Interaction model: `viewport-bottom-dock-scan`
- Visual model: `four-slot-widget-dock`
- Motion model: `none`
- Semantic purpose: `bottom-pinned-widget-rack`

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
