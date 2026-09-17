# Pull Quote Rule

An oversized pull quote with a graduated emphasis trick: the first clause renders at full weight and the remainder tapers through two lighter tones — drawing the eye through the sentence in reading order.

## Install

```bash
openui add pull-quote-rule
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `text` → subcategory `editorial`
- Interaction model: `static`
- Visual model: `tapered-weight-quote`
- Motion model: `none`
- Semantic purpose: `pull-quote`

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
