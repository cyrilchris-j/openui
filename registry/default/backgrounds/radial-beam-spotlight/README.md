# Radial Beam Spotlight

An angled overhead conical beam spotlight illuminating the focal hero area against darkness.

## Install

```bash
openui add radial-beam-spotlight
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `backgrounds` → subcategory `ambient`
- Interaction model: `passive-lighting-underlay`
- Visual model: `conic-spotlight-cone`
- Motion model: `none`
- Semantic purpose: `stage-spotlight-illumination`

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
