# Hover Audio Waveform Scrub

An audio waveform bar chart displaying instantaneous amplitude bars with real-time horizontal playback scrub.

## Install

```bash
openui add hover-audio-waveform-scrub
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `interactions` → subcategory `pointer`
- Interaction model: `waveform-hover-scrubbing`
- Visual model: `amplitude-bar-histogram`
- Motion model: `scrubber-hairline-glide`
- Semantic purpose: `audio-waveform-scrubber`

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
