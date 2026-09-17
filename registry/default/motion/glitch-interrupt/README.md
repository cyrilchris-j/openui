# Glitch Interrupt

Random micro-glitches interrupt an otherwise calm element: RGB-split flickers, 1-frame clip slices and character substitutions fire on a seeded schedule, then the element returns to perfect stillness — decay, not a loop.

## Install

```bash
openui add glitch-interrupt
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `motion` → subcategory `experimental`
- Interaction model: `seeded-random-interrupt`
- Visual model: `rgb-split-slices`
- Motion model: `burst-decay`
- Semantic purpose: `unsettling-accent`

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
