# Mirror Reflect Text

A vertical mirror of the headline rendered with a scaleY(-1) copy, masked by a gradient so the reflection fades with distance — positioned from the glyph baseline, not the box, so descenders sit right.

## Install

```bash
openui add mirror-reflect-text
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `text` → subcategory `paint`
- Interaction model: `static`
- Visual model: `scale-y-mirror`
- Motion model: `none`
- Semantic purpose: `display-statement`

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
