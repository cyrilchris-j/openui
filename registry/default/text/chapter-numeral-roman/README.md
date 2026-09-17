# Chapter Numeral Roman

Chapter openers with an oversized roman numeral set behind the title as a ghost layer — the numeral clips through the heading on scroll using a background-attached gradient, so text passes over it like a watermark.

## Install

```bash
openui add chapter-numeral-roman
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `text` → subcategory `editorial`
- Interaction model: `scroll-clip`
- Visual model: `ghost-numeral-underlay`
- Motion model: `parallax-clip`
- Semantic purpose: `chapter-opener`

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
