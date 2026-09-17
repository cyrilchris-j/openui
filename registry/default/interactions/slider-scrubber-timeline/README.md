# Slider Scrubber Timeline

A precision timeline scrubber providing continuous frame position scrub and millisecond tooltip tracking.

## Install

```bash
openui add slider-scrubber-timeline
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `interactions` → subcategory `pointer`
- Interaction model: `precision-timeline-scrub`
- Visual model: `graduated-timecode-ribbon`
- Motion model: `continuous-linear-scrub`
- Semantic purpose: `media-scrubber-timeline`

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
