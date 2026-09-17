# Interactive Matrix Keypad

A 3x4 numeric pin entry pad with haptic tactile depression feedback and masked passcode sequence display.

## Install

```bash
openui add interactive-matrix-keypad
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `interactions` → subcategory `pointer`
- Interaction model: `numeric-keypad-entry`
- Visual model: `pinpad-button-matrix`
- Motion model: `discrete-key-depression`
- Semantic purpose: `security-pin-keypad`

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
