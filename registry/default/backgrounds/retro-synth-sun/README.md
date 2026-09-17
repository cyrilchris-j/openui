# Retro Synth Sun

Classic 80s outrun synthwave sun silhouette with horizontal sliced blind cutouts.

## Install

```bash
openui add retro-synth-sun
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `backgrounds` → subcategory `ambient`
- Interaction model: `passive-outrun-sun`
- Visual model: `sliced-horizontal-sun-disc`
- Motion model: `none`
- Semantic purpose: `synthwave-sunset-disc`

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
