import { PortfolioSection } from "../shared/PortfolioSection";
import { Reveal } from "../shared/Reveal";
import { HudLine, MicroLabel } from "../shared/decorations";
import { VideoAccordion } from "./VideoAccordion";
import { ServicesGlass } from "./ServicesGlass";

/**
 * Section 07 — SHOWCASE. Dua konten:
 * A. Video accordion (5 YouTube, click-to-play).
 * B. Glass services block (layanan + kontak cepat, data bio owner).
 */
export function CaseStudySection() {
  return (
    <PortfolioSection id="case-study" index={7} label="SHOWCASE" theme="dark" bleed>
      <div className="px-6 py-20 md:px-10 lg:px-[clamp(40px,6vw,96px)]">
        <Reveal className="mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <MicroLabel className="text-gold/80">VIDEO SHOWCASE</MicroLabel>
            <h2 className="mt-3 font-display text-4xl uppercase leading-none text-paper md:text-5xl">
              PILIH & PUTAR
            </h2>
          </div>
          <p className="max-w-[300px] font-mono text-[10.5px] leading-relaxed text-paper/45">
            Arahkan untuk buka, klik untuk putar. Video dimuat hanya saat diminta.
          </p>
        </Reveal>

        <VideoAccordion />

        <div className="my-16 flex items-center gap-4" aria-hidden="true">
          <span className="h-px flex-1 bg-white/12" />
          <MicroLabel className="text-paper/40">LAYANAN & KONTAK CEPAT</MicroLabel>
          <span className="h-px flex-1 bg-white/12" />
        </div>

        <Reveal variant="fade">
          <ServicesGlass />
        </Reveal>

        <div className="mt-12 flex items-center gap-4">
          <HudLine className="flex-1" width="100%" />
          <MicroLabel className="text-paper/40">SHOWCASE — 02 BLOK</MicroLabel>
          <HudLine className="flex-1" width="100%" />
        </div>
      </div>
    </PortfolioSection>
  );
}
