# Newsletter Subscribe Strip

Compact horizontal email capture strip with privacy guarantee and subscription confirmation feedback.

## Install

```bash
openui add newsletter-subscribe-strip
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `sections` → subcategory `cta`
- Interaction model: `email-capture-form`
- Visual model: `horizontal-email-strip`
- Motion model: `none`
- Semantic purpose: `newsletter-capture-section`

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
