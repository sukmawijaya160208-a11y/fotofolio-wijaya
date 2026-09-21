import { Play } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { Reveal } from "../shared/Reveal";

const bars = [10, 16, 22, 14, 20, 11, 18, 13];

export function FocusAudioCard() {
  const reduce = useReducedMotion();
  return (
    <Reveal
      variant="slide"
      direction="left"
      delay={0.6}
      className="relative flex w-[150px] items-center justify-between gap-2 rounded-[14px] border border-line bg-paper/85 px-3.5 py-3 shadow-[0_6px_18px_rgba(23,35,45,.10)] backdrop-blur"
    >
      <div className="flex h-8 items-end gap-[2.5px]" aria-hidden="true">
        {bars.map((h, i) => (
          <span
            key={i}
            className="w-[2.5px] rounded-full bg-tech/70"
            style={{
              height: h,
              animation: reduce ? "none" : `eqbar 1.1s ease-in-out ${i * 0.09}s infinite alternate`,
            }}
          />
        ))}
      </div>
      <div className="flex flex-col gap-0.5">
        <span className="font-mono text-[8.5px] font-medium uppercase leading-tight tracking-[0.14em] text-ink">
          SHH... FOCUS
        </span>
        <span className="font-mono text-[8.5px] uppercase leading-tight tracking-[0.14em] text-muted">
          ON MY DREAM!
        </span>
      </div>
      <button
        type="button"
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-panel text-paper transition-transform duration-200 hover:scale-105"
        aria-label="Putar audio fokus (mock)"
      >
        <Play size={11} fill="currentColor" strokeWidth={0} />
      </button>
    </Reveal>
  );
}
