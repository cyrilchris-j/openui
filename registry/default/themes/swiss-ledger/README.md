# Swiss Ledger

A high-contrast, zero-radius theme for data-dense surfaces.

## Install

```bash
openui theme add swiss-ledger
```

Then import the stylesheet once, in your root layout:

```ts
import "@/styles/swiss-ledger.css";
```

## Tokens

| Token            | Light                | Dark                  |
| ---------------- | -------------------- | --------------------- |
| `--color-paper`  | `#f7f5f0`            | `#0b0b0a`             |
| `--color-ink`    | `#0e0e0d`            | `#f5f2ec`             |
| `--color-oxide`  | `#a83216` (AA on paper) | `#e2624a`          |

Radius tokens are all `0px`. Motion tokens collapse to `0ms` under
`prefers-reduced-motion` — the theme does not ship motion, it just declares it.

## Design notes

Everything structural is a hairline. If a region needs separation, add a rule
rather than a shadow; the theme provides `.swiss-hairline` and
`.swiss-rule-grid` for exactly that.
