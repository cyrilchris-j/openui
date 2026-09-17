# Customer Logo Ticker

An animated corporate brand marquee strip showcasing enterprise adopters and venture partners.

## Install

```bash
openui add customer-logo-ticker
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `sections` → subcategory `social-proof`
- Interaction model: `customer-logo-ticker-interaction`
- Visual model: `customer-logo-ticker-visual`
- Motion model: `subtle`
- Semantic purpose: `customer-logo-ticker-section`

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
