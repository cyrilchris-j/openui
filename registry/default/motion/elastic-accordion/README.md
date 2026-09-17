# Elastic Accordion

An accordion whose panels open with elastic overshoot: neighbouring rows are pushed with a spring-lag (each row's displacement chases the row above), so the stack wobbles like a slinky instead of snapping rigid.

## Install

```bash
openui add elastic-accordion
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `motion` → subcategory `physics`
- Interaction model: `click-expand`
- Visual model: `chained-push-rows`
- Motion model: `per-row-spring-lag`
- Semantic purpose: `faq-disclosure`

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
