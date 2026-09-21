import { Reveal } from "../shared/Reveal";

export function KeepGoing() {
  return (
    <Reveal
      variant="fade"
      delay={0.8}
      className="relative flex flex-col leading-[0.8]"
    >
      <span
        className="font-hand text-burgundy/85"
        style={{ fontSize: "clamp(30px, 3.4vw, 48px)" }}
      >
        Keep
      </span>
      <span
        className="font-hand text-ink/80"
        style={{ fontSize: "clamp(30px, 3.4vw, 48px)" }}
      >
        Going!
      </span>
      <span
        aria-hidden="true"
        className="mt-1.5 flex items-center gap-2 font-mono text-[9px] tracking-[0.2em] text-gold"
      >
        <span>✦</span>
        <span className="h-px w-10 bg-gold/45" />
        <span>✦</span>
      </span>
    </Reveal>
  );
}
