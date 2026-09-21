import { Reveal } from "../shared/Reveal";

const motto = ["DREAM", "FOCUS", "PROGRESS"];

export function TechMotto() {
  return (
    <Reveal variant="fade" delay={0.5} className="flex flex-col items-end gap-1">
      <span className="font-mono text-[11px] tracking-[0.16em] text-tech">/</span>
      {motto.map((m, i) => (
        <span
          key={m}
          className={`font-mono text-[11px] uppercase tracking-[0.2em] ${
            i === 1 ? "text-ink" : "text-tech/80"
          }`}
        >
          {m}
        </span>
      ))}
      <span className="font-mono text-[11px] tracking-[0.16em] text-tech">/</span>
    </Reveal>
  );
}
