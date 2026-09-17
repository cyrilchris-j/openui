# Decrypt Text

Click-to-decrypt ciphertext: a button-styled text surface that re-runs a keyed glyph resolution on every activation, with run progress announced to screen readers and deterministic per-index glyphs.

## Install

```bash
openui add decrypt-text
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `text` → subcategory `kinetic`
- Interaction model: `click-rerun`
- Visual model: `keyed-glyph-hash`
- Motion model: `ordered-resolve`
- Semantic purpose: `message-decode`

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
