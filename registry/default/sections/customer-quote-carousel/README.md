# Customer Quote Carousel

Verified customer testimonial card with pull-quote statement, author avatar, credentials, and verification seal.

## Install

```bash
openui add customer-quote-carousel
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `sections` → subcategory `social-proof`
- Interaction model: `quote-testimony-presentation`
- Visual model: `bordered-quote-card`
- Motion model: `none`
- Semantic purpose: `customer-testimony-section`

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
