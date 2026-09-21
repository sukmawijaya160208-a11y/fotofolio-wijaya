import { useState } from "react";
import { projects } from "../../data/projects";
import { PortfolioSection } from "../shared/PortfolioSection";
import { Reveal } from "../shared/Reveal";
import { ArrowUpRight } from "lucide-react";
import { HudLine, MicroLabel, TechnicalCorner } from "../shared/decorations";

type Project = (typeof projects)[number];

function ProjectRow({
  project,
  index,
  onEnter,
}: {
  project: Project;
  index: number;
  onEnter: () => void;
}) {
  return (
    <article
      onMouseEnter={onEnter}
      onFocus={onEnter}
      className="group relative border-t border-line transition-colors duration-300 last:border-b hover:bg-paper/60"
    >
      {/* Mobile / touch: inline image */}
      <div className="overflow-hidden px-1 pt-5 lg:hidden">
        <img
          src={project.image}
          alt={`Pratinjau proyek ${project.title}`}
          width={800}
          height={600}
          loading={index < 2 ? "eager" : "lazy"}
          decoding="async"
          className="aspect-[4/3] w-full rounded-[12px] border border-line object-cover"
        />
      </div>

      <div className="flex items-baseline gap-4 px-1 py-5 md:gap-6 md:py-6">
        <span className="w-8 shrink-0 font-mono text-[11px] tracking-[0.16em] text-gold">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2.5">
            {project.featured && (
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden="true" />
            )}
            <h3 className="font-display text-[clamp(24px,3.4vw,44px)] uppercase leading-[0.95] text-ink transition-transform duration-300 ease-out group-hover:translate-x-2">
              {project.title}
            </h3>
          </div>
          <p className="mt-2 font-mono text-[9.5px] uppercase leading-relaxed tracking-[0.14em] text-muted">
            {project.category} · {project.year} · {project.tags.join(" · ")}
          </p>
          {project.caseStudyId && (
            <a
              href="#case-study"
              className="mt-2.5 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-burgundy transition-colors hover:text-ink"
            >
              VIEW CASE STUDY <ArrowUpRight size={12} strokeWidth={2} />
            </a>
          )}
        </div>
        <ArrowUpRight
          size={22}
          strokeWidth={1.5}
          aria-hidden="true"
          className="hidden shrink-0 text-tech transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-burgundy sm:block"
        />
      </div>
    </article>
  );
}

export function ProjectsSection() {
  const [active, setActive] = useState(0);
  const current = projects[active] ?? projects[0];

  return (
    <PortfolioSection
      id="projects"
      index={6}
      label="PROJECTS"
      theme="light"
      className="flex items-center py-[var(--section-pad)]"
      minHeight="120vh"
    >
      <div className="relative z-10 w-full">
        <Reveal className="mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <MicroLabel>WHAT I BUILD</MicroLabel>
            <h2 className="mt-3 font-display text-4xl uppercase leading-none text-ink md:text-5xl">
              SELECTED WORKS
            </h2>
          </div>
          <div className="flex items-baseline gap-4">
            <span className="font-mono text-[11px] tracking-[0.2em] text-gold">
              {String(projects.length).padStart(2, "0")}
            </span>
            <p className="max-w-[300px] font-mono text-[10.5px] leading-relaxed text-muted">
              Kumpulan proyek terpilih — karya nyata, deskripsi detail menyusul.
            </p>
          </div>
        </Reveal>
        <HudLine className="mb-8" width="100%" />

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            {projects.map((p, i) => (
              <ProjectRow key={p.id} project={p} index={i} onEnter={() => setActive(i)} />
            ))}
          </div>

          {/* Sticky preview — desktop only, no cursor chasing */}
          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-[110px]">
              <div className="relative aspect-[4/5] max-h-[560px] w-full overflow-hidden rounded-[18px] border border-line bg-paper shadow-[0_18px_44px_rgba(23,35,45,.14)]">
                {projects.map((p, i) => (
                  <img
                    key={p.id}
                    src={p.image}
                    alt=""
                    aria-hidden="true"
                    width={700}
                    height={875}
                    loading={i === 0 ? "eager" : "lazy"}
                    decoding="async"
                    className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
                      active === i ? "opacity-100" : "opacity-0"
                    }`}
                  />
                ))}
                <TechnicalCorner variant="top-right" size={13} />
                <span className="absolute right-4 top-4 font-display text-2xl leading-none text-ink/80 drop-shadow-[0_1px_0_rgba(255,255,255,.6)]">
                  {String(active + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="mt-3 flex items-baseline justify-between gap-3 px-1">
                <MicroLabel className="text-ink/80">{current.title}</MicroLabel>
                <MicroLabel className="text-muted">
                  {current.category} · {current.year}
                </MicroLabel>
              </div>
            </div>
          </div>
        </div>

        <Reveal variant="fade" delay={0.1} className="mt-8 flex items-center gap-4">
          <span className="h-px flex-1 bg-line" aria-hidden="true" />
          <MicroLabel className="text-muted">PROJECT INDEX — {projects.length} ENTRIES</MicroLabel>
          <span className="h-px flex-1 bg-line" aria-hidden="true" />
        </Reveal>
      </div>
    </PortfolioSection>
  );
}
