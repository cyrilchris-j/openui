# Status Pill

Status labels that stay readable in greyscale and to screen readers.

## Props

| Prop      | Type                                                              | Default     |
| --------- | ----------------------------------------------------------------- | ----------- |
| `tone`    | `neutral \| live \| pending \| attention \| muted`                | `neutral`   |
| `size`    | `sm \| md`                                                        | `md`        |
| `srLabel` | `string`                                                          | —           |

## Accessibility

Each tone has a **shape** (`○ ● ◐ ▲ —`) as well as a colour, so state is never
communicated by hue alone. Pass `srLabel` when the visible text is an
abbreviation.

## Design notes

Square corners, monospace, uppercase, tight tracking. A status pill is a filed
record, not a badge: it should look like a stamp on a document.
