# Justify Hyphen Proof

A justified paragraph with manual soft-hyphen control and rivers visualisation: toggle justification, hyphenation and a river-detector overlay that highlights the vertical gaps justified text leaves behind.

## Install

```bash
openui add justify-hyphen-proof
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `text` → subcategory `editorial`
- Interaction model: `toggle-proof`
- Visual model: `river-highlight-overlay`
- Motion model: `none`
- Semantic purpose: `typographic-proofing`

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
