# Design System

Genre: Technical
Macrostructure: Stack
Density: Compact
Shape: Sharp
Motion: Mechanical
Typography: Monospace
Color: Monochrome

## Rules

- One loop per canvas; never nest loops or run a second rAF inside the draw
  callback.
- All motion is a function of `elapsed`, never of frame count, so the animation
  speed is identical at 30, 60 and 144 Hz.
- The loop must stop when the canvas is hidden or offscreen; a paused loop is
  the correct state, a busy loop is a bug.

## Avoid

- Allocating objects inside the draw callback; reuse buffers across frames.
- Reading layout (getBoundingClientRect) inside the draw callback; sizes come
  from the ResizeObserver.
