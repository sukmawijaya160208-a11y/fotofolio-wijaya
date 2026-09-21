import { profile } from "../../data/profile";
import { PortfolioSection } from "../shared/PortfolioSection";
import { Reveal } from "../shared/Reveal";
import { TextMaskReveal } from "../shared/TextMaskReveal";
import { Crosshair, HudLine, MicroLabel, ScanLine, TechnicalCorner } from "../shared/decorations";

function DossierRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-line/40 py-3">
      <MicroLabel className="shrink-0">{label}</MicroLabel>
      <span className="text-right font-mono text-[11px] leading-snug text-paper/85">{value}</span>
    </div>
  );
}

function IdentityPortrait() {
  return (
    <Reveal variant="scale" duration={0.9} className="relative mx-auto aspect-square w-full max-w-[360px]">
      <div className="absolute -inset-3 rounded-full border border-line/50" aria-hidden="true" />
      <TechnicalCorner variant="top-left" size={16} className="!-left-4 !-top-4" />
      <TechnicalCorner variant="bottom-right" size={16} className="!-bottom-4 !-right-4" />
      <div className="relative h-full w-full overflow-hidden rounded-full border-2 border-paper bg-panel shadow-[0_24px_56px_rgba(23,35,45,.28)]">
        <img
          src={profile.portraitImage}
          alt="Potret Muhammad Sukma Wijaya"
          width={360}
          height={360}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover grayscale contrast-105"
        />
        <ScanLine />
        <div className="absolute inset-0 bg-gradient-to-t from-panel/40 to-transparent" />
        <MicroLabel
          className="absolute bottom-3 left-1/2 -translate-x-1/2 text-paper/70"
          style={{ textShadow: "0 1px 4px rgba(0,0,0,.6)" }}
        >
          ID-SCAN 48
        </MicroLabel>
      </div>
      <Crosshair className="-right-1 top-6" />
      <Crosshair className="-left-1 bottom-10" />
    </Reveal>
  );
}

export function IdentitySection() {
  return (
    <PortfolioSection
      id="about"
      index={2}
      label="IDENTITY"
      theme="light"
      className="flex items-center py-[var(--section-pad)]"
      minHeight="90vh"
    >
      <div className="relative z-10 grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <TextMaskReveal
            as="h2"
            text={"WHO\nAM\nI?"}
            className="font-display uppercase leading-[0.86] text-ink"
            delay={0.1}
            duration={1}
          />
          <span
            className="mt-4 block font-hand text-2xl text-burgundy/90"
            aria-hidden="true"
          >
            {profile.displayName}
          </span>
          <HudLine className="mt-6 max-w-[180px]" />
          <p className="mt-6 max-w-[300px] text-[13px] leading-relaxed text-muted">
            {profile.about}
          </p>
        </div>

        <div className="lg:col-span-4">
          <IdentityPortrait />
        </div>

        <Reveal
          variant="slide"
          direction="right"
          delay={0.25}
          className="relative overflow-hidden rounded-[20px] border border-white/10 bg-panel p-6 shadow-[0_20px_48px_rgba(18,28,37,.26)] lg:col-span-4"
        >
          <TechnicalCorner variant="top-right" size={14} />
          <div className="flex items-center justify-between">
            <MicroLabel className="text-paper/55">PROFILE DOSSIER</MicroLabel>
            <span className="font-mono text-[9px] tracking-[0.18em] text-gold">VERIFIED</span>
          </div>
          <h3 className="mt-3 font-display text-2xl uppercase leading-none text-paper">
            {profile.name}
          </h3>
          <div className="mt-5 flex flex-col">
            <DossierRow label="ROLE" value={profile.role} />
            <DossierRow label="EDUCATION" value={profile.education} />
            <DossierRow label="UNIVERSITY" value={profile.university} />
            <DossierRow label="FOCUS" value={profile.focus.join(" / ")} />
            <DossierRow label="BASED" value={profile.based} />
          </div>
          <div className="mt-5 flex flex-wrap gap-1.5">
            {profile.tags.map((t) => (
              <span
                key={t}
                className="rounded-sm border border-paper/15 bg-paper/[0.06] px-2 py-1 font-mono text-[8.5px] uppercase tracking-[0.16em] text-paper/70"
              >
                {t}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </PortfolioSection>
  );
}
