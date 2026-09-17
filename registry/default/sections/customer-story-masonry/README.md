# Customer Story Masonry

An editorial masonry layout displaying verified customer case studies with ROI statistics and testimonial quotes.

## Install

```bash
openui add customer-story-masonry
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `sections` → subcategory `testimonials`
- Interaction model: `customer-story-masonry-interaction`
- Visual model: `customer-story-masonry-visual`
- Motion model: `subtle`
- Semantic purpose: `customer-story-masonry-section`

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
