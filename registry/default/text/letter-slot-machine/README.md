# Letter Slot Machine

Each letter is a clipped vertical reel of the full alphabet; changing the value spins every reel through a different number of stops, so the word resolves left-to-right like a payline landing.

## Install

```bash
openui add letter-slot-machine
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `text` → subcategory `kinetic`
- Interaction model: `value-change-trigger`
- Visual model: `clipped-column-reels`
- Motion model: `cyclic-strip-spin`
- Semantic purpose: `value-display`

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
