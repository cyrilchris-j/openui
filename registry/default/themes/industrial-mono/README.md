# Industrial Mono

A dark-first instrumentation theme.

## Install

```bash
openui theme add industrial-mono
```

```ts
import "@/styles/industrial-mono.css";
```

## Tokens

| Token           | Dark      | Light     |
| --------------- | --------- | --------- |
| `--color-paper` | `#0b0c0d` | `#f2f2ef` |
| `--color-ink`   | `#e6e8e3` | `#101112` |
| `--color-oxide` | `#d98b2b` | `#a8620f` |

Utilities: `.instrument-panel` (cut corner), `.instrument-readout`,
`.instrument-label`.

## Design notes

This theme is dark-first: the light block is the override, not the default. Keep
one signal colour. Adding a second glow makes the cut-corner panels read as
decoration instead of instrumentation.
