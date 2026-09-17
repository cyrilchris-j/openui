# Magnetic Cursor Bubble

A liquid bubble node that follows pointer coordinates with fluid velocity lag and viscoelastic stretch.

## Install

```bash
openui add magnetic-cursor-bubble
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `interactions` → subcategory `pointer`
- Interaction model: `fluid-bubble-lag-tracking`
- Visual model: `viscoelastic-fluid-droplet`
- Motion model: `damped-lag-interpolation`
- Semantic purpose: `fluid-pointer-droplet`

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
