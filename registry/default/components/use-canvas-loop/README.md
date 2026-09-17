# Use Canvas Loop

The shared requestAnimationFrame loop for canvas resources. Every canvas
background in the registry runs on this hook so the performance contract is
enforced in one place instead of reinvented per resource.

## What it enforces

- **DPR correctness** — the canvas backing store is sized to
  `devicePixelRatio` (capped at 2) and the context is scaled, so drawing code
  works in CSS pixels everywhere.
- **Pause when hidden** — `visibilitychange` stops the loop when the tab is
  hidden.
- **Pause when offscreen** — an IntersectionObserver stops the loop when the
  canvas leaves the viewport.
- **Reduced motion** — under `prefers-reduced-motion: reduce` the loop never
  starts; the caller's draw function runs once so the canvas shows a static
  frame.
- **Teardown** — listeners, observers and the animation frame are all released
  on unmount.

## Usage

```tsx
const canvasRef = useCanvasLoop((ctx, width, height, elapsed) => {
  ctx.clearRect(0, 0, width, height);
  // draw, using `elapsed` for time-based motion
});

return <canvas ref={canvasRef} className="h-full w-full" />;
```

## When not to use

For anything CSS can do (gradients, static patterns, transitions) CSS is
cheaper than a canvas and a rAF loop. Reserve this hook for genuinely
per-pixel or particle work.
