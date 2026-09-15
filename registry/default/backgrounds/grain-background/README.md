# Grain Background

A film-grain surface with no image payload.

## Props

| Prop      | Type                                                  | Default     |
| --------- | ----------------------------------------------------- | ----------- |
| `opacity` | `number` (0–0.25)                                     | `0.06`      |
| `scale`   | `number`                                              | `1`         |
| `blend`   | `overlay \| soft-light \| multiply \| screen`          | `overlay`   |

## Notes

`feTurbulence` with `stitchTiles="stitch"` means the noise has no visible seams
and costs one filter render, not one request per tile. Keep `opacity` under 0.12
for text surfaces; raise it only for decorative panels.
