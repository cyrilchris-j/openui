import { SilverScreenSubtitles } from "./silver-screen-subtitles";

export default function Demo() {
  return (
    <div className="flex min-h-[18rem] items-center justify-center bg-paper p-10">
      <SilverScreenSubtitles
        className="w-full max-w-lg"
        cues={[
          { start: 0, end: 5, text: "Registries are contracts between authors and installers." },
          { start: 6, end: 12, text: "The schema is where the trust lives." },
          { start: 13, end: 20, text: "Everything else is presentation." },
        ]}
      />
    </div>
  );
}
