# Password Strength Mark

A wordmark that grades itself: the word STRENGTH renders letter-by-letter, and how many letters are inked versus ghosted encodes password score — typography doubling as a meter without a single bar.

## Install

```bash
openui add password-strength-mark
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `text` → subcategory `data`
- Interaction model: `value-driven-reveal`
- Visual model: `partial-glyph-inking`
- Motion model: `step-ink-fill`
- Semantic purpose: `strength-meter`

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
