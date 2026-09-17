# Matrix Binary Curtain

Alternating columns of digital binary 1s and 0s forming a structured computational veil.

## Install

```bash
openui add matrix-binary-curtain
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `backgrounds` → subcategory `patterns`
- Interaction model: `passive-binary-curtain`
- Visual model: `columnar-binary-digits`
- Motion model: `none`
- Semantic purpose: `binary-code-backdrop`

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
