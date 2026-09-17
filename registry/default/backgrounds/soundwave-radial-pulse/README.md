# Soundwave Radial Pulse

Circular audio sonar pulses emanating radially outward like acoustic underwater echolocation.

## Install

```bash
openui add soundwave-radial-pulse
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `backgrounds` → subcategory `ambient`
- Interaction model: `passive-sonar-pulse`
- Visual model: `pulsing-echolocation-rings`
- Motion model: `none`
- Semantic purpose: `sonar-pulse-canvas`

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
