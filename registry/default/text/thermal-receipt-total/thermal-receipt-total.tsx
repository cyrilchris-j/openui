import { cn } from "@/lib/cn";

export interface ReceiptLine {
  label: string;
  amount: number;
}

export interface ThermalReceiptTotalProps {
  lines: ReceiptLine[];
  taxRate?: number;
  currency?: string;
  className?: string;
}

export function ThermalReceiptTotal({
  lines,
  taxRate = 0.08,
  currency = "$",
  className,
}: ThermalReceiptTotalProps) {
  const subtotal = lines.reduce((sum, line) => sum + line.amount, 0);
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  const fmt = (value: number) => `${currency}${value.toFixed(2)}`;

  return (
    <div className={cn("w-64 font-mono text-sm", className)} role="table" aria-label="Receipt">
      {lines.map((line, index) => (
        <ReceiptRow key={index} label={line.label} value={fmt(line.amount)} />
      ))}
      <div aria-hidden className="my-2 border-t border-dashed border-ink/40" />
      <ReceiptRow label="Subtotal" value={fmt(subtotal)} />
      <ReceiptRow label={`Tax (${Math.round(taxRate * 100)}%)`} value={fmt(tax)} />
      <div aria-hidden className="my-2 border-t-2 border-double border-ink" />
      <div className="flex items-baseline">
        <span className="font-semibold">TOTAL</span>
        <span className="tabular-nums font-semibold" style={{ marginLeft: "auto" }}>
          {fmt(total)}
        </span>
      </div>
    </div>
  );
}

function ReceiptRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline" role="row">
      <span role="cell">{label}</span>
      <span
        aria-hidden
        className="mx-1 flex-1 select-none overflow-hidden whitespace-nowrap text-ink/40"
        style={{ maskImage: "linear-gradient(to right, transparent, black 20%, black 80%, transparent)" }}
      >
        {"·".repeat(40)}
      </span>
      <span role="cell" className="tabular-nums">{value}</span>
    </div>
  );
}

export default ThermalReceiptTotal;
