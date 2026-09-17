# Hover Magnify Dock

An icon tray shelf computing Gaussian proximity curves to smoothly enlarge icons surrounding mouse pointer.

## Install

```bash
openui add hover-magnify-dock
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `interactions` → subcategory `hover`
- Interaction model: `gaussian-dock-magnification`
- Visual model: `docked-shelf-capsules`
- Motion model: `proximity-bell-scaling`
- Semantic purpose: `app-launcher-shelf`

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
