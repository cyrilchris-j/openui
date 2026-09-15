# Accordion Index

A numbered disclosure list for contents pages, FAQs and spec sheets.

## Props

| Prop          | Type               | Default | Notes                                  |
| ------------- | ------------------ | ------- | -------------------------------------- |
| `items`       | `AccordionItem[]`  | —       | `title`, `body`, optional `meta`.       |
| `numbered`    | `boolean`          | `true`  | Zero-padded index column.               |
| `defaultOpen` | `number`           | —       | Index opened on mount.                  |

## Accessibility

- Native `<details>`/`<summary>`: no ARIA required, keyboard works by default.
- `name` groups the items, so opening one closes the others.
- Find-in-page expands matching sections automatically.

## Design notes

The index number is the visual spine. Keep it monospace and tabular; do not
replace it with an icon or a chevron — the number is what makes a list of
disclosures read as a contents page.
