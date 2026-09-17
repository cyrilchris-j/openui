# Elastic Drawer Curtain

A lateral drawer with an elastic pull string that deforms under user drag before parting cleanly from the screen edge.

## Install

```bash
openui add elastic-drawer-curtain
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `motion` → subcategory `gestures`
- Interaction model: `lateral-draw-pull`
- Visual model: `taut-string-boundary`
- Motion model: `elastic-tension-release`
- Semantic purpose: `lateral-navigation-panel`

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
