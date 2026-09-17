# Scroll Spy Table of Contents

An article outline sidebar highlighting active document section based on viewport intersection position.

## Install

```bash
openui add scroll-spy-table-of-contents
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `interactions` → subcategory `scroll`
- Interaction model: `viewport-intersection-highlighting`
- Visual model: `vertical-rail-index`
- Motion model: `indicator-glide-step`
- Semantic purpose: `document-section-tracker`

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
