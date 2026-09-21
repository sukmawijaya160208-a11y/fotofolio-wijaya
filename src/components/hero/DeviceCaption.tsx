import { Reveal } from "../shared/Reveal";

const lines = ["SAME BOY", "BIGGER", "VISION"];

export function DeviceCaption() {
  return (
    <Reveal variant="fade" delay={0.78} className="flex items-center gap-3">
      <span className="block h-[120px] w-px bg-gradient-to-b from-transparent via-tech/50 to-transparent" />
      <div className="flex flex-col gap-1">
        {lines.map((l, i) => (
          <span
            key={l}
            className={`font-mono text-[10.5px] uppercase tracking-[0.2em] ${
              i === 1 ? "text-ink" : "text-muted"
            }`}
          >
            {l}
          </span>
        ))}
        <span className="mt-1 flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 bg-burgundy/70" />
          <span className="h-1.5 w-1.5 border border-tech/60" />
        </span>
      </div>
    </Reveal>
  );
}
