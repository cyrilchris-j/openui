# Circular Aperture Diaphragm

Mechanical camera lens iris aperture diaphragm blades forming an optical polygonal opening.

## Install

```bash
openui add circular-aperture-diaphragm
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `backgrounds` → subcategory `ambient`
- Interaction model: `passive-camera-aperture`
- Visual model: `overlapping-iris-blades`
- Motion model: `none`
- Semantic purpose: `photographic-aperture-backdrop`

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
