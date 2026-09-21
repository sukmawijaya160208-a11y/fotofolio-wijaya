import { experiences } from "../../data/experiences";
import { PortfolioSection } from "../shared/PortfolioSection";
import { Reveal } from "../shared/Reveal";
import { Crosshair, HudLine, MicroLabel, TechnicalCorner } from "../shared/decorations";

const spans = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-12"];

function ExperienceCard({
  exp,
  span,
  delay,
}: {
  exp: (typeof experiences)[number];
  span: string;
  delay: number;
}) {
  return (
    <Reveal
      variant="slide"
      direction="up"
      delay={delay}
      className={`group relative overflow-hidden rounded-[18px] border border-white/10 bg-panel/90 p-6 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_22px_52px_rgba(18,28,37,.4)] md:p-8 ${span}`}
    >
      <TechnicalCorner variant="top-left" size={13} />
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="font-display text-4xl leading-none text-gold/85">
            {String(exp.id.slice(-2)).padStart(2, "0")}
          </span>
          <div>
            <MicroLabel className="text-paper/45">EXPERIENCE</MicroLabel>
            <h3 className="font-display text-2xl uppercase leading-none text-paper md:text-3xl">
              {exp.role}
            </h3>
          </div>
        </div>
        <span className="rounded-sm border border-gold/40 px-2 py-1 font-mono text-[8.5px] uppercase tracking-[0.18em] text-gold/85">
          {exp.status}
        </span>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-1.5">
        <span className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-paper/75">
          {exp.organization}
        </span>
        <span className="font-mono text-[10px] text-paper/45">{exp.period}</span>
      </div>
      <HudLine className="my-4" width="100%" />
      <p className="max-w-[640px] text-[13px] leading-relaxed text-paper/70">{exp.description}</p>
      <ul className="mt-5 flex flex-wrap gap-1.5">
        {exp.tags.map((t) => (
          <li
            key={t}
            className="rounded-sm border border-paper/12 bg-paper/[0.05] px-2 py-1 font-mono text-[8.5px] uppercase tracking-[0.16em] text-paper/65"
          >
            {t}
          </li>
        ))}
      </ul>
      <Crosshair className="bottom-4 right-4" />
    </Reveal>
  );
}

export function ExperienceSection() {
  return (
    <PortfolioSection
      id="work"
      index={5}
      label="EXPERIENCE"
      theme="panel"
      className="flex items-center py-[var(--section-pad)]"
      minHeight="100vh"
    >
      <div className="relative z-10 w-full">
        <Reveal className="mb-10 max-w-[640px]">
          <MicroLabel>WHAT I HAVE DONE</MicroLabel>
          <h2 className="mt-3 font-display text-4xl uppercase leading-none text-paper md:text-5xl">
            WORK COMMAND BOARD
          </h2>
          <HudLine className="mt-5 max-w-[200px]" />
        </Reveal>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {experiences.map((exp, i) => (
            <ExperienceCard key={exp.id} exp={exp} span={spans[i] ?? ""} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </PortfolioSection>
  );
}
