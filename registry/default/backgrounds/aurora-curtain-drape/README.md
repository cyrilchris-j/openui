# Aurora Curtain Drape

Vertical waving celestial curtains of polar light draped softly across a starry night backdrop.

## Install

```bash
openui add aurora-curtain-drape
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `backgrounds` → subcategory `ambient`
- Interaction model: `passive-aurora-drape`
- Visual model: `vertical-light-ribbons`
- Motion model: `none`
- Semantic purpose: `polar-curtain-drape`

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
