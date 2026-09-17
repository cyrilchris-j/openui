# Tilt Parallax Scene

A composite illustration broken into three physical visual planes shifting in 3D parallax space in response to pointer angles.

## Install

```bash
openui add tilt-parallax-scene
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `interactions` → subcategory `hover`
- Interaction model: `perspective-tilt-tracking`
- Visual model: `tri-plane-layered-diorama`
- Motion model: `differential-plane-shear`
- Semantic purpose: `parallax-feature-scene`

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
