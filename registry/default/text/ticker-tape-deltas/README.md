# Ticker Tape Deltas

A stock-quote tape: symbols scroll horizontally while up/down deltas render as triangle glyphs with tabular numerals, ticking live values and flashing the cell background on change like a trading terminal.

## Install

```bash
openui add ticker-tape-deltas
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `text` → subcategory `data`
- Interaction model: `ambient-loop`
- Visual model: `scrolling-quote-tape`
- Motion model: `marquee-with-flash`
- Semantic purpose: `market-data`

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
