# Halftone Circular Burst

Radial burst of concentric halftone dots scaling upward toward center.

## Install

```bash
openui add halftone-circular-burst
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `backgrounds` → subcategory `patterns`
- Interaction model: `passive-halftone-burst`
- Visual model: `radial-dot-burst-explosion`
- Motion model: `none`
- Semantic purpose: `comic-halftone-explosion`

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
