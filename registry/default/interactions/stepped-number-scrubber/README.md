# Stepped Number Scrubber

An inline numeric metric that increases or decreases dynamically as user drags pointer horizontally across label.

## Install

```bash
openui add stepped-number-scrubber
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `interactions` → subcategory `pointer`
- Interaction model: `label-scrub-numeric-drag`
- Visual model: `inline-scrubbable-glyph`
- Motion model: `horizontal-rate-increment`
- Semantic purpose: `inline-parameter-scrubber`

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
