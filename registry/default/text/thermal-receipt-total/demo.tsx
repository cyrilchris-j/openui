import { ThermalReceiptTotal } from "./thermal-receipt-total";

export default function Demo() {
  return (
    <div className="flex min-h-[16rem] items-center justify-center p-10" style={{ background: "#efe9dc" }}>
      <div className="rounded-sm bg-white px-5 py-4 shadow-md" style={{ transform: "rotate(-1deg)" }}>
        <ThermalReceiptTotal
          lines={[
            { label: "Type specimen", amount: 24 },
            { label: "Grid poster", amount: 18 },
            { label: "Manifesto", amount: 5 },
          ]}
        />
      </div>
    </div>
  );
}
