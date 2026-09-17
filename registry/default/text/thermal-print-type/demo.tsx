import { ThermalPrintType } from "./thermal-print-type";

export default function Demo() {
  return (
    <div className="flex min-h-[12rem] items-center justify-center bg-paper p-10">
      <ThermalPrintType className="text-step-3 text-ink">
        *** ORDER 0042 CONFIRMED ***
      </ThermalPrintType>
    </div>
  );
}
