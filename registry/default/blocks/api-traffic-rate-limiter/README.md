# API Traffic Rate Limiter

An edge rate limiting rule configurator managing requests-per-minute ceilings, burst limits, and CIDR blocks.

## Install

```bash
openui add api-traffic-rate-limiter
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `blocks` → subcategory `devops`
- Interaction model: `rate-limit-slider-configuration`
- Visual model: `firewall-throttling-card`
- Motion model: `none`
- Semantic purpose: `edge-traffic-rate-limiting`

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
