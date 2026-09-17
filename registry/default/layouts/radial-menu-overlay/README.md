# Radial Menu Overlay

Fullscreen spatial layout with circular radial pie menu actions clustered around central anchor.

## Install

```bash
openui add radial-menu-overlay
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `layouts` → subcategory `shells`
- Interaction model: `pie-menu-selection`
- Visual model: `circular-radial-action-dial`
- Motion model: `none`
- Semantic purpose: `radial-quick-dial-stage`

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
