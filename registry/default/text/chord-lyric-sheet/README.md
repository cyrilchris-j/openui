# Chord Lyric Sheet

Song sheet typography: chord names float above lyrics in a monospace grid with exact column alignment, chord lines tint, and tapping a chord plays nothing but shows its fingering in a popover — alignment typography as musical notation.

## Install

```bash
openui add chord-lyric-sheet
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `text` → subcategory `technical`
- Interaction model: `tap-chord-popover`
- Visual model: `column-aligned-chords`
- Motion model: `none`
- Semantic purpose: `musical-score`

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
