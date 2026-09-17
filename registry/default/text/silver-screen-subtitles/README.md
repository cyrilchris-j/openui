# Silver Screen Subtitles

Cinema-grade subtitles: word-wrapped to 42 characters per line (the industry standard), timed against a playhead, positioned bottom-centre with a safety margin, and re-rendered per cue without animation jank.

## Install

```bash
openui add silver-screen-subtitles
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `text` → subcategory `accessible`
- Interaction model: `playhead-sync`
- Visual model: `cue-wrapped-lines`
- Motion model: `cue-swap`
- Semantic purpose: `captioning`

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
