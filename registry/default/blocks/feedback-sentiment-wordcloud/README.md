# Feedback Sentiment Wordcloud

An aggregated customer sentiment visualization highlighting dominant feedback keywords and approval score.

## Install

```bash
openui add feedback-sentiment-wordcloud
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `blocks` → subcategory `feedback`
- Interaction model: `sentiment-tag-cloud-inspection`
- Visual model: `keyword-frequency-cloud`
- Motion model: `subtle`
- Semantic purpose: `customer-sentiment-analysis`

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
