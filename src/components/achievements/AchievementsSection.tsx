import { PortfolioSection } from "../shared/PortfolioSection";
import { Reveal } from "../shared/Reveal";
import { ScrollVideo } from "../shared/ScrollVideo";
import { MicroLabel } from "../shared/decorations";

/**
 * Section 09 — HIGHLIGHT. Video full-bleed yang di-scrub oleh scroll
 * (turun = maju, naik = mundur). Overlay minimal, tanpa klaim.
 */
export function AchievementsSection() {
  return (
    <PortfolioSection
      id="achievements"
      index={9}
      label="HIGHLIGHT"
      theme="dark"
      bleed
      className="flex min-h-[100svh] items-end"
    >
      <ScrollVideo src="/assets/highlight.mp4" label="Video highlight" />
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(180deg, rgba(3,5,7,.55) 0%, transparent 30%, transparent 62%, rgba(3,5,7,.72) 100%)",
        }}
      />
      <div className="relative z-10 w-full px-6 pb-14 md:px-10 lg:px-[clamp(40px,6vw,96px)]">
        <Reveal>
          <MicroLabel className="text-paper/60">09 / HIGHLIGHT</MicroLabel>
          <h2 className="mt-3 font-display text-[clamp(40px,7vw,96px)] uppercase leading-[0.85] text-paper">
            MOMEN
          </h2>
          <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-paper/50">
            SCROLL — VIDEO MENGIKUTI GERAKANMU
          </p>
        </Reveal>
      </div>
    </PortfolioSection>
  );
}
