import { Reveal } from "../shared/Reveal";

const bars = [8, 13, 18, 11, 16, 9, 14, 10, 17, 12];

export function RightQuoteCard() {
  return (
    <Reveal
      variant="slide"
      direction="right"
      delay={0.64}
      className="relative w-[168px] rounded-[14px] border border-line bg-paper/70 px-3.5 py-4 shadow-[0_8px_20px_rgba(23,35,45,.10)] backdrop-blur"
    >
      <div className="mb-3 flex h-5 items-end gap-[2px]" aria-hidden="true">
        {bars.map((h, i) => (
          <span
            key={i}
            className="w-[2px] rounded-full bg-tech/65"
            style={{ height: h }}
          />
        ))}
      </div>
      {["THE BEST", "VERSION", "OF MYSELF"].map((l, i) => (
        <span
          key={l}
          className={`block font-mono text-[10px] font-medium uppercase leading-relaxed tracking-[0.14em] ${
            i === 1 ? "text-burgundy" : "text-ink/85"
          }`}
        >
          {l}
        </span>
      ))}
    </Reveal>
  );
}
