# Customer Quote Marquee

A continuous sliding ribbon of authentic customer reviews and developer commendations.

## Install

```bash
openui add customer-quote-marquee
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `sections` → subcategory `testimonials`
- Interaction model: `customer-quote-marquee-interaction`
- Visual model: `customer-quote-marquee-visual`
- Motion model: `subtle`
- Semantic purpose: `customer-quote-marquee-section`

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
