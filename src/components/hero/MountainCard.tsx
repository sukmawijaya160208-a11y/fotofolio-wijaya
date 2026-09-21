import { ArrowRight } from "lucide-react";
import { Reveal } from "../shared/Reveal";

export function MountainCard() {
  return (
    <Reveal
      variant="scale"
      delay={0.72}
      className="group relative h-[148px] w-full max-w-[210px] overflow-hidden rounded-[16px] border border-line shadow-[0_10px_26px_rgba(23,35,45,.14)]"
    >
      <div
        className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
        style={{
          background:
            "linear-gradient(180deg, #dfe7ec 0%, #c3d0d9 55%, #aabac5 100%)",
        }}
        aria-hidden="true"
      />
      <svg
        viewBox="0 0 210 148"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <g fill="none" stroke="rgba(23,35,45,.35)" strokeWidth="1">
          <path d="M-10 118 L52 62 L96 104 L138 52 L196 118 L220 118" />
          <path d="M-10 132 L62 88 L104 120 L150 78 L220 132" opacity="0.6" />
        </g>
        <circle cx="168" cy="38" r="12" fill="rgba(255,255,255,.7)" />
        <g stroke="rgba(23,35,45,.2)" strokeWidth="0.75">
          <path d="M0 40 H210" />
          <path d="M0 20 H210" opacity="0.5" />
        </g>
      </svg>
      <div className="absolute inset-0 bg-gradient-to-t from-panel/55 via-transparent to-paper/10 backdrop-blur-[1px]" />
      <div className="absolute bottom-3 left-3.5">
        <p className="font-display text-[15px] uppercase leading-[0.95] text-paper drop-shadow">
          Better
        </p>
        <p className="font-display text-[15px] uppercase leading-[0.95] text-paper drop-shadow">
          Days
        </p>
        <p className="mt-0.5 flex items-center gap-1 font-mono text-[9.5px] uppercase tracking-[0.14em] text-paper">
          Ahead <ArrowRight size={11} strokeWidth={2} />
        </p>
      </div>
    </Reveal>
  );
}
