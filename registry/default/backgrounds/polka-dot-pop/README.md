# Polka Dot Pop

Crisp staggered modern polka dots with alternating row offsets for playful editorial headers.

## Install

```bash
openui add polka-dot-pop
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `backgrounds` → subcategory `patterns`
- Interaction model: `passive-staggered-dots`
- Visual model: `staggered-polka-pattern`
- Motion model: `none`
- Semantic purpose: `playful-dot-wallpaper`

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
