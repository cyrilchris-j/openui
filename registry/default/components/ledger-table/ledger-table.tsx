"use client";

import { useMemo, useState } from "react";
import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/cn";

/**
 * Ledger Table
 *
 * A dense table for lists that are read, not admired. It exists because most
 * "data table" components ship as a styled `div` soup with `role="table"` bolted
 * on. This one is a real `<table>`:
 *
 *  - sorting state is announced with `aria-sort` on the `<th>`
 *  - the header row sticks without becoming a floating card
 *  - rows are keyboard reachable only when they are actually interactive
 *  - numeric columns get tabular figures and right alignment
 */

export type LedgerAlign = "left" | "right";

export interface LedgerColumn<T> {
  key: string;
  header: string;
  align?: LedgerAlign;
  /** Sortable columns must expose a comparable primitive. */
  accessor?: (row: T) => string | number;
  render?: (row: T) => React.ReactNode;
  width?: string;
}

export interface LedgerTableProps<T> {
  columns: LedgerColumn<T>[];
  rows: T[];
  rowKey: (row: T) => string;
  caption?: string;
  initialSort?: { key: string; direction: "asc" | "desc" };
  onRowClick?: (row: T) => void;
  emptyMessage?: string;
  className?: string;
}

export function LedgerTable<T>({
  columns,
  rows,
  rowKey,
  caption,
  initialSort,
  onRowClick,
  emptyMessage = "No records.",
  className,
}: LedgerTableProps<T>) {
  const [sort, setSort] = useState(initialSort ?? null);

  const sorted = useMemo(() => {
    if (!sort) return rows;
    const column = columns.find((candidate) => candidate.key === sort.key);
    if (!column?.accessor) return rows;
    const direction = sort.direction === "asc" ? 1 : -1;
    return [...rows].sort((a, b) => {
      const left = column.accessor!(a);
      const right = column.accessor!(b);
      if (typeof left === "number" && typeof right === "number") return (left - right) * direction;
      return String(left).localeCompare(String(right), "en") * direction;
    });
  }, [columns, rows, sort]);

  function toggleSort(column: LedgerColumn<T>) {
    if (!column.accessor) return;
    setSort((current) =>
      current?.key === column.key
        ? { key: column.key, direction: current.direction === "asc" ? "desc" : "asc" }
        : { key: column.key, direction: "asc" },
    );
  }

  return (
    <div className={cn("w-full overflow-x-auto border border-line bg-paper", className)}>
      <table className="w-full border-collapse text-left font-mono text-[13px] leading-tight">
        {caption ? (
          <caption className="border-b border-line px-3 py-2 text-left text-[11px] uppercase tracking-[0.24em] text-graphite">
            {caption}
          </caption>
        ) : null}
        <thead className="sticky top-0 z-10 bg-paper">
          <tr className="border-b border-ink">
            {columns.map((column) => {
              const isSorted = sort?.key === column.key;
              const sortable = Boolean(column.accessor);
              return (
                <th
                  key={column.key}
                  scope="col"
                  style={column.width ? { width: column.width } : undefined}
                  aria-sort={
                    isSorted ? (sort!.direction === "asc" ? "ascending" : "descending") : "none"
                  }
                  className={cn(
                    "px-3 py-2 text-[11px] font-medium uppercase tracking-[0.18em] text-graphite",
                    column.align === "right" ? "text-right" : "text-left",
                  )}
                >
                  {sortable ? (
                    <button
                      type="button"
                      onClick={() => toggleSort(column)}
                      className={cn(
                        "inline-flex items-center gap-1.5 uppercase tracking-[0.18em] transition-colors",
                        "hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-oxide",
                        column.align === "right" && "flex-row-reverse",
                        isSorted && "text-ink",
                      )}
                    >
                      {column.header}
                      {isSorted ? (
                        sort!.direction === "asc" ? (
                          <ArrowUp aria-hidden="true" className="size-3" />
                        ) : (
                          <ArrowDown aria-hidden="true" className="size-3" />
                        )
                      ) : (
                        <ChevronsUpDown aria-hidden="true" className="size-3 opacity-40" />
                      )}
                    </button>
                  ) : (
                    column.header
                  )}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {sorted.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-3 py-8 text-center text-graphite">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            sorted.map((row) => (
              <tr
                key={rowKey(row)}
                onClick={onRowClick ? () => onRowClick(row) : undefined}
                className={cn(
                  "border-b border-line last:border-b-0",
                  onRowClick &&
                    "cursor-pointer transition-colors hover:bg-ink hover:text-paper focus-within:bg-ink focus-within:text-paper",
                )}
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={cn(
                      "px-3 py-2 align-top",
                      column.align === "right" && "text-right [font-variant-numeric:tabular-nums]",
                    )}
                  >
                    {column.render ? column.render(row) : String(column.accessor?.(row) ?? "")}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default LedgerTable;
