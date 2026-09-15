# Editorial Oxide

A warm editorial theme with a display serif and one accent.

## Install

```bash
openui theme add editorial-oxide
```

```ts
import "@/styles/editorial-oxide.css";
```

## Tokens

| Token           | Light     | Dark      | Notes                          |
| --------------- | --------- | --------- | ------------------------------ |
| `--color-paper` | `#f3f0e9` | `#0c0c0b` | Warm paper / near-black.       |
| `--color-ink`   | `#100f0d` | `#f2efe7` | Iron-gall ink.                 |
| `--color-oxide` | `#b33f26` | `#e4614a` | 5.05:1 on paper (WCAG AA).     |

Utility classes: `.editorial-prose`, `.editorial-display`, `.editorial-meta`.

## Design notes

Pair the display serif with a neutral sans for body text. Do not set the serif
below 24px — a display face loses its character at text sizes, and the theme
stops reading as editorial.
