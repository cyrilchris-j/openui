# Customer Testimonial Spotlight

A focused executive testimonial spotlight highlighting quote, corporate logo, and verified impact metrics.

## Install

```bash
openui add customer-testimonial-spotlight
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `sections` → subcategory `testimonials`
- Interaction model: `customer-testimonial-spotlight-interaction`
- Visual model: `customer-testimonial-spotlight-visual`
- Motion model: `subtle`
- Semantic purpose: `customer-testimonial-spotlight-section`

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
