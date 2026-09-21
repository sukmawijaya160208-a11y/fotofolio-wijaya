import { profile } from "../../data/profile";
import { Reveal } from "../shared/Reveal";
import { TechnicalCorner } from "../shared/decorations";

export function AboutCard() {
  return (
    <Reveal
      variant="slide"
      direction="right"
      delay={0.62}
      duration={0.85}
      className="relative w-full max-w-[330px] overflow-hidden rounded-[20px] border border-white/12 bg-panel/85 p-5 shadow-[0_18px_44px_rgba(18,28,37,.30)] backdrop-blur-md"
    >
      <TechnicalCorner variant="top-left" size={12} />
      <span
        aria-hidden="true"
        className="absolute right-4 top-3.5 font-mono text-base text-gold/80"
      >
        ✦
      </span>
      <h3 className="font-mono text-[10px] font-medium uppercase tracking-[0.26em] text-paper/55">
        ABOUT ME
      </h3>
      <p className="mt-2.5 max-w-[330px] text-[12.5px] leading-relaxed text-paper/90">
        {profile.about}
      </p>
      <ul className="mt-4 flex flex-wrap gap-1.5">
        {profile.tags.map((t) => (
          <li
            key={t}
            className="rounded-sm border border-paper/15 bg-paper/[0.06] px-2 py-1 font-mono text-[8.5px] uppercase tracking-[0.16em] text-paper/75"
          >
            {t}
          </li>
        ))}
      </ul>
    </Reveal>
  );
}
