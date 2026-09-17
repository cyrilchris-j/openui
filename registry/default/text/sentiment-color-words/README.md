# Sentiment Color Words

A sentiment readout where each word is tinted by its valence score on a diverging scale — negative cools, positive warms — with a hover tooltip exposing the exact score and a legend that doubles as the scale.

## Install

```bash
openui add sentiment-color-words
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `text` → subcategory `data`
- Interaction model: `hover-readout`
- Visual model: `valence-tinted-words`
- Motion model: `none`
- Semantic purpose: `sentiment-display`

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
