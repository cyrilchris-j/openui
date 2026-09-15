# Ledger Table

A dense table for inventories, changelogs and dashboards.

## Props

| Prop          | Type                              | Notes                                       |
| ------------- | --------------------------------- | ------------------------------------------- |
| `columns`     | `LedgerColumn<T>[]`               | `accessor` makes a column sortable.          |
| `rows`        | `T[]`                             | Data, unsorted.                              |
| `rowKey`      | `(row) => string`                 | Stable React key.                            |
| `caption`     | `string`                          | Rendered as a real `<caption>`.              |
| `initialSort` | `{ key, direction }`              | Applied on mount.                            |
| `onRowClick`  | `(row) => void`                   | Adds hover affordance to rows.               |

## Accessibility

- Native table semantics: `<table>`, `<thead>`, `<th scope="col">`.
- `aria-sort` reflects the active column and direction.
- Sort controls are buttons, so they are keyboard operable.
- Rows are only interactive when `onRowClick` is provided.

## Design notes

The table carries its structure in hairlines, not surfaces: no zebra stripes, no
rounded container, no shadow. Numeric columns use tabular figures so digits line
up — a ledger that cannot be scanned is not a ledger.
