# Use In View

Reports whether an element is intersecting the viewport, with `once` mode for
lazy activation.

## Usage

```tsx
const { ref, inView } = useInView<HTMLDivElement>({ once: true });

<div ref={ref}>{inView ? <ExpensiveAnimation /> : <Placeholder />}</div>
```

## Notes

- `once: true` unobserves after the first intersection — the catalogue's lazy
  previews use this so offscreen tiles never pay for animation.
- Without `once`, the flag toggles as the element enters and leaves, which is
  what scroll-linked resources want.
- The observer is disconnected on unmount; no leaks.
