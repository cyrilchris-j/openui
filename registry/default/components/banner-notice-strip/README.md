# Banner Notice Strip

An informational full-width banner notice with action CTA button and dismiss trigger.

## Install

```bash
openui add banner-notice-strip
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `components` → subcategory `feedback`
- Interaction model: `announcement-banner-cta`
- Visual model: `full-width-notice-strip`
- Motion model: `none`
- Semantic purpose: `announcement-banner-ribbon`

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
