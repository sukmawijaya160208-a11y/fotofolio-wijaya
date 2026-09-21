import { achievements, miniAchievements } from "../../data/achievements";
import { profile } from "../../data/profile";
import { PortfolioSection } from "../shared/PortfolioSection";
import { Reveal } from "../shared/Reveal";
import { CountUpNumber } from "../shared/CountUpNumber";
import { Crosshair, HudLine, MicroLabel, TechnicalCorner } from "../shared/decorations";

function parseValue(raw: string) {
  const n = parseFloat(raw);
  if (Number.isNaN(n)) return { num: 0, decimals: 0, literal: raw };
  return { num: n, decimals: raw.includes(".") ? 1 : 0, literal: null };
}

function KineticStat({
  ach,
  index,
}: {
  ach: (typeof achievements)[number];
  index: number;
}) {
  const { num, decimals, literal } = parseValue(ach.value);
  const isPlaceholder = literal !== null;
  return (
    <Reveal
      variant="fade"
      delay={index * 0.08}
      className={`relative flex flex-col ${index === 0 ? "lg:col-span-5" : "lg:col-span-3"}`}
    >
      <div className="flex items-baseline gap-1">
        {isPlaceholder ? (
          <span className="font-display text-[clamp(56px,7vw,112px)] leading-[0.8] text-tech/35">
            {ach.value}
          </span>
        ) : (
          <CountUpNumber
            value={num}
            decimals={decimals}
            suffix={ach.suffix}
            className="font-display text-[clamp(56px,7vw,112px)] leading-[0.8] text-ink"
          />
        )}
      </div>
      <div className="mt-2.5 flex items-center gap-2.5">
        <span className="h-px w-7 bg-burgundy/60" />
        <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink/80">
          {ach.label}
        </span>
      </div>
      <span className="mt-1.5 font-mono text-[10px] text-muted">{ach.note}</span>
      {index === 0 && <Crosshair className="-right-2 top-2" />}
    </Reveal>
  );
}

export function AchievementsSection() {
  return (
    <PortfolioSection
      id="achievements"
      index={9}
      label="ACHIEVEMENTS"
      theme="light"
      className="flex items-center py-[var(--section-pad)]"
      minHeight="95vh"
    >
      <div className="relative z-10 w-full">
        <Reveal className="mb-12">
          <MicroLabel>WHAT I HAVE ACCOMPLISHED</MicroLabel>
          <h2 className="mt-3 font-display text-4xl uppercase leading-none text-ink md:text-5xl">
            NUMBERS
          </h2>
          <HudLine className="mt-5 max-w-[200px]" />
        </Reveal>
        <div className="grid grid-cols-2 gap-y-12 gap-x-6 border-t border-line pt-12 lg:grid-cols-12">
          {achievements.map((ach, i) => (
            <KineticStat key={`stat-${i}`} ach={ach} index={i} />
          ))}
        </div>
        <div className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-3">
          {miniAchievements.map((m, i) => (
            <Reveal
              key={`mini-${i}`}
              variant="slide"
              direction="up"
              delay={i * 0.08}
              className="relative overflow-hidden rounded-[14px] border border-line bg-paper/80 p-5"
            >
              <TechnicalCorner variant="top-right" size={11} />
              <MicroLabel>{m.year}</MicroLabel>
              <h3 className="mt-2 font-display text-lg uppercase leading-none text-ink">
                {m.title}
              </h3>
              <p className="mt-2 text-[12px] leading-relaxed text-muted">{m.note}</p>
            </Reveal>
          ))}
        </div>
        <p className="mt-8 font-mono text-[10px] text-muted">
          {profile.username} — data aktual belum diisi, ganti di src/data/achievements.ts
        </p>
      </div>
    </PortfolioSection>
  );
}
