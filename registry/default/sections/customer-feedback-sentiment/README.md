# Customer Feedback Sentiment

An aggregate user rating overview with NPS score breakdown, star reviews, and verified feedback quotes.

## Install

```bash
openui add customer-feedback-sentiment
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `sections` → subcategory `reviews`
- Interaction model: `customer-feedback-sentiment-interaction`
- Visual model: `customer-feedback-sentiment-visual`
- Motion model: `subtle`
- Semantic purpose: `customer-feedback-sentiment-section`

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
