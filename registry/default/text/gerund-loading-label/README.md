# Gerund Loading Label

Loading states as real gerunds: “Validating…”, “Compiling…”, “Installing…” — the label swaps at random-ish intervals with a typing underline that grows like a progress sense, and a final past-tense completion flip.

## Install

```bash
openui add gerund-loading-label
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `text` → subcategory `technical`
- Interaction model: `async-state-machine`
- Visual model: `typed-progress-label`
- Motion model: `underline-grow`
- Semantic purpose: `progress-feedback`

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
