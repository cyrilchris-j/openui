# Floating Dock Bar

An elevated floating application launcher shelf with icon buttons, tooltips, and blur backdrop.

## Install

```bash
openui add floating-dock-bar
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `components` → subcategory `navigation`
- Interaction model: `floating-dock-navigation`
- Visual model: `capsule-dock-shelf`
- Motion model: `none`
- Semantic purpose: `app-launcher-dock-bar`

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
