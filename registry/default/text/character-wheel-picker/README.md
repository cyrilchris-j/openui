# Character Wheel Picker

A slot-machine you drive: up/down arrows (or wheel) spin each character column independently through the alphabet with inertial easing, composing text letter by letter — an input mechanism, not an animation.

## Install

```bash
openui add character-wheel-picker
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `text` → subcategory `interactive`
- Interaction model: `wheel-and-key-input`
- Visual model: `independent-letter-columns`
- Motion model: `inertial-column-spin`
- Semantic purpose: `text-entry`

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
