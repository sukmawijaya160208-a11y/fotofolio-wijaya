import { projects } from "../../data/projects";
import { PortfolioSection } from "../shared/PortfolioSection";
import { Reveal } from "../shared/Reveal";
import { ArrowUpRight } from "lucide-react";
import { HudLine, MicroLabel, TechnicalCorner } from "../shared/decorations";

type ProjectCardProps = {
  project: (typeof projects)[number];
  index: number;
  variant: "featured" | "half" | "strip";
  delay: number;
};

function ProjectCard({ project, index, variant, delay }: ProjectCardProps) {
  const isFeatured = variant === "featured";
  const isStrip = variant === "strip";
  return (
    <Reveal
      variant="fade"
      delay={delay}
      className={`group relative overflow-hidden rounded-[18px] border border-line bg-paper shadow-[0_14px_36px_rgba(23,35,45,.12)] transition-[box-shadow] duration-300 hover:shadow-[0_22px_54px_rgba(23,35,45,.2)] ${
        isFeatured
          ? "lg:col-span-7 lg:row-span-2"
          : isStrip
            ? "lg:col-span-12"
            : "lg:col-span-5"
      }`}
    >
      <div className={`relative overflow-hidden ${isFeatured ? "h-[230px] md:h-[300px] lg:h-full lg:min-h-[440px]" : isStrip ? "h-[180px] md:h-[220px]" : "h-[200px] md:h-[230px]"}`}>
        <img
          src={project.image}
          alt={`Pratinjau proyek ${project.title}`}
          width={isFeatured ? 900 : 600}
          height={isFeatured ? 600 : 400}
          loading={index < 2 ? "eager" : "lazy"}
          decoding="async"
          className="h-full w-full object-cover grayscale transition-transform duration-[800ms] ease-out group-hover:scale-105 group-hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-panel/85 via-panel/25 to-transparent" />
        <TechnicalCorner variant="top-right" size={13} />
        <span className="absolute right-4 top-4 font-display text-2xl leading-none text-paper/90 drop-shadow">
          {String(index + 1).padStart(2, "0")}
        </span>
        {project.featured && (
          <span className="absolute left-4 top-4 rounded-sm bg-gold px-2 py-1 font-mono text-[8.5px] font-medium uppercase tracking-[0.18em] text-panel">
            Featured
          </span>
        )}
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
        <div className="flex items-center gap-3">
          <MicroLabel className="text-paper/70">{project.category}</MicroLabel>
          <span className="h-3 w-px bg-paper/35" />
          <MicroLabel className="text-paper/55">{project.year}</MicroLabel>
        </div>
        <h3
          className={`mt-2 font-display uppercase leading-none text-paper drop-shadow ${
            isFeatured ? "text-4xl md:text-5xl" : "text-2xl"
          }`}
        >
          {project.title}
        </h3>
        <p className="mt-2.5 max-w-[520px] text-[12.5px] leading-relaxed text-paper/75">
          {project.description}
        </p>
        <div className="mt-3.5 flex flex-wrap items-center gap-1.5">
          {project.tags.map((t) => (
            <span
              key={t}
              className="rounded-sm border border-paper/20 bg-paper/[0.08] px-2 py-1 font-mono text-[8.5px] uppercase tracking-[0.16em] text-paper/70"
            >
              {t}
            </span>
          ))}
        </div>
        {project.caseStudyId && (
          <a
            href="#case-study"
            className="mt-4 inline-flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.16em] text-gold transition-colors hover:text-paper"
          >
            VIEW CASE STUDY <ArrowUpRight size={13} strokeWidth={2} />
          </a>
        )}
      </div>
    </Reveal>
  );
}

export function ProjectsSection() {
  const featured = projects.find((p) => p.featured) ?? projects[0];
  const rest = projects.filter((p) => p.id !== featured.id);
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
          <p className="max-w-[300px] font-mono text-[10.5px] leading-relaxed text-muted">
            Kumpulan proyek terpilih. Ganti dengan karya nyata di src/data/projects.ts
          </p>
        </Reveal>
        <HudLine className="mb-8" width="100%" />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <ProjectCard project={featured} index={0} variant="featured" delay={0.1} />
          {rest.slice(0, 2).map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i + 1} variant="half" delay={0.2 + i * 0.08} />
          ))}
          {rest[2] && (
            <ProjectCard project={rest[2]} index={3} variant="strip" delay={0.38} />
          )}
        </div>
      </div>
    </PortfolioSection>
  );
}
