# Use Reduced Motion

Subscribes to `prefers-reduced-motion: reduce` and returns a boolean. The
subscription is live: if the user changes the setting while the page is open,
every consumer updates.

## Usage

```tsx
const reduced = useReducedMotion();
```

Rules for using it well:

- Reduced motion means **replace**, not just "shorter". A reveal becomes a fade
  of opacity only, or an immediate state change.
- Never hide content behind animation that reduced-motion users cannot see.
- Pair with CSS `motion-reduce:` utilities where the effect is pure styling.
