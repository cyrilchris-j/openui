# Editorial Navigation

A two-tier masthead for documentation and registry sites.

## Props

| Prop           | Type          | Notes                                    |
| -------------- | ------------- | ---------------------------------------- |
| `wordmark`     | `ReactNode`   | Identity, links to `/`.                   |
| `links`        | `NavLink[]`   | Primary navigation.                       |
| `utilityLinks` | `NavLink[]`   | Thin strip above (docs, contributors).    |
| `currentPath`  | `string`      | Drives `aria-current="page"`.             |
| `actions`      | `ReactNode`   | Buttons on the right.                     |

## Accessibility

- Skip link as the first focusable element.
- `aria-expanded` + `aria-controls` on the mobile disclosure.
- Escape closes the panel and restores focus to the toggle.
- `aria-current="page"` on the active route, in both tiers.

## Design notes

The active state is an underline rule, not a filled pill. Keep the utility strip
one line and monospace; it is the masthead's small print.
