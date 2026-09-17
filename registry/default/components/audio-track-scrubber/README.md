# Audio Track Scrubber

Compact playback bar with play/pause state, dynamic progress waveform ticks, and timestamp display.

## Install

```bash
openui add audio-track-scrubber
```

Dependencies: lucide-react.

## What makes it distinct

- Category: `components` → subcategory `media`
- Interaction model: `waveform-progress-scrubbing`
- Visual model: `bar-waveform-track`
- Motion model: `none`
- Semantic purpose: `audio-playback-control`

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
