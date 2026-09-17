# Vertical Phrase Ticker

A fixed-height window where phrases slide vertically through like a stock ticker — the outgoing line exits upward while the incoming one enters from below simultaneously, keeping the box a constant height.

## Install

```bash
openui add vertical-phrase-ticker
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `text` → subcategory `kinetic`
- Interaction model: `timer-cycle`
- Visual model: `two-line-slide-window`
- Motion model: `vertical-exchange`
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
