# Input Otp Pin

A 6-digit one-time password segmented passcode entry with automatic focus transfer across slots.

## Install

```bash
openui add input-otp-pin
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `components` → subcategory `inputs`
- Interaction model: `segmented-otp-entry`
- Visual model: `six-cell-digit-slots`
- Motion model: `none`
- Semantic purpose: `otp-verification-input`

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
