import type { Signal } from "@preact/signals";
import Vapi  from "../components/Vapi.tsx";

interface CounterProps {
  count: Signal<number>;
}

export default function Counter(props: CounterProps) {
  return (
    <div class="flex gap-8 py-6">
      <Vapi></Vapi>
    </div>
  );
}
