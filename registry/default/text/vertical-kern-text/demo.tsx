import { VerticalKernText } from "./vertical-kern-text";

export default function Demo() {
  return (
    <div className="flex min-h-[14rem] items-stretch justify-center gap-8 bg-paper p-10">
      <div className="border-l border-line pl-3">
        <VerticalKernText>Chapter One</VerticalKernText>
      </div>
      <div className="border-r border-line pr-3">
        <VerticalKernText flip>Chapter Two</VerticalKernText>
      </div>
    </div>
  );
}
