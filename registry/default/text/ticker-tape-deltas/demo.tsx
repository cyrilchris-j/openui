import { TickerTapeDeltas } from "./ticker-tape-deltas";

export default function Demo() {
  return (
    <div className="flex min-h-[12rem] items-center justify-center bg-paper p-10">
      <TickerTapeDeltas
        className="w-full max-w-lg"
        quotes={[
          { symbol: "OPEN", value: 42.8 },
          { symbol: "REGI", value: 12.35 },
          { symbol: "META", value: 8.9 },
          { symbol: "GLYP", value: 104.2 },
        ]}
      />
    </div>
  );
}
