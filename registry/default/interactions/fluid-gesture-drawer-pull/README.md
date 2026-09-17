# Fluid Gesture Drawer Pull

A lateral slide-out drawer whose edge tab bulges elastically outward during pull gesture like liquid rubber.

## Install

```bash
openui add fluid-gesture-drawer-pull
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `interactions` → subcategory `gestures`
- Interaction model: `viscoelastic-tab-drawer-pull`
- Visual model: `bulging-lateral-tab`
- Motion model: `viscous-edge-deformation`
- Semantic purpose: `fluid-gesture-drawer`

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
