# Wax Seal Stamp

An initials monogram pressed into a wax disc: radial-gradient wax with irregular blob edge (border-radius trick), debossed lettering via inner shadows, and a press animation on click that re-stamps the seal.

## Install

```bash
openui add wax-seal-stamp
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `text` → subcategory `editorial`
- Interaction model: `click-restamp`
- Visual model: `debossed-wax-disc`
- Motion model: `press-imprint`
- Semantic purpose: `authenticity-mark`

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
