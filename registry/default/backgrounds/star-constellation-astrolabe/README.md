# Star Constellation Astrolabe

Brass medieval Islamic navigational astrolabe with stereographic rete and star pointers.

## Install

```bash
openui add star-constellation-astrolabe
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `backgrounds` → subcategory `patterns`
- Interaction model: `passive-astrolabe-grid`
- Visual model: `stereographic-rete-astrolabe`
- Motion model: `none`
- Semantic purpose: `ancient-astrolabe-backdrop`

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
