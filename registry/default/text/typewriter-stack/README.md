# Typewriter Stack

Types and deletes successive phrases with a blinking caret, where typing speed varies per character (humanised), deletion is faster than typing, and the caret width adapts to the current glyph.

## Install

```bash
openui add typewriter-stack
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `text` → subcategory `kinetic`
- Interaction model: `timer-cycle`
- Visual model: `incremental-substring`
- Motion model: `asymmetric-type-erase`
- Semantic purpose: `heading-rotation`

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
