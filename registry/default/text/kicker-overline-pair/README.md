# Kicker Overline Pair

The magazine pairing: a tracked-out uppercase kicker over a display headline, locked to a shared baseline grid with an optically-weighted rule between them — one component that enforces the editorial relationship.

## Install

```bash
openui add kicker-overline-pair
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `text` → subcategory `editorial`
- Interaction model: `static`
- Visual model: `kicker-rule-headline-lockup`
- Motion model: `none`
- Semantic purpose: `section-opener`

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
