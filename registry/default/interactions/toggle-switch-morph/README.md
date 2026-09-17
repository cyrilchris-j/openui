# Toggle Switch Morph

A binary switch button whose round thumb squashes into a wide capsule during drag travel before snapping.

## Install

```bash
openui add toggle-switch-morph
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `interactions` → subcategory `gestures`
- Interaction model: `morphing-thumb-toggle`
- Visual model: `elastic-capsule-chassis`
- Motion model: `squash-and-stretch-travel`
- Semantic purpose: `morphing-binary-switch`

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
