# Video Playlist Workbench

An educational video library block pairing an embedded video stage with an episodic queued playlist.

## Install

```bash
openui add video-playlist-workbench
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `blocks` → subcategory `media`
- Interaction model: `video-queue-selection-switching`
- Visual model: `video-stage-with-playlist-rail`
- Motion model: `subtle`
- Semantic purpose: `course-video-workbench`

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
