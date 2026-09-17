# Redaction Declassifier

Government-memo typography: passages are blacked out with marker bars, and hovering (or focusing) a bar sweeps the ink away to reveal the text underneath, then re-redacts when attention leaves.

## Install

```bash
openui add redaction-declassifier
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `text` → subcategory `interactive`
- Interaction model: `hover-declassify`
- Visual model: `ink-bar-censor`
- Motion model: `wipe-reveal`
- Semantic purpose: `mystery-reveal`

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
