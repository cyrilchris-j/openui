import { WhisperStageDirection } from "./whisper-stage-direction";

export default function Demo() {
  return (
    <div className="flex min-h-[18rem] items-center justify-center bg-paper p-10">
      <WhisperStageDirection
        className="w-full max-w-lg"
        script={[
          { kind: "direction", text: "A registry office. Rain on the window.", involves: "all" },
          { kind: "speech", character: "author", text: "I have eight hundred resources and no catalogue." },
          { kind: "direction", text: "Steward does not look up.", involves: "steward" },
          { kind: "speech", character: "steward", text: "Then you have eight hundred rumours. Validate them." },
          { kind: "speech", character: "author", text: "How?" },
          { kind: "direction", text: "Steward slides a schema across the desk.", involves: "steward" },
          { kind: "speech", character: "steward", text: "One field at a time." },
        ]}
      />
    </div>
  );
}
