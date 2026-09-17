# Editorial Drop Cap

A true initial letter: the first character sits in a measured float spanning a fixed number of text lines, with a hanging indent recomputed from the glyph's actual advance width, not a guessed ch value.

## Install

```bash
openui add editorial-drop-cap
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `text` → subcategory `editorial`
- Interaction model: `static`
- Visual model: `measured-float-initial`
- Motion model: `none`
- Semantic purpose: `article-opening`

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
