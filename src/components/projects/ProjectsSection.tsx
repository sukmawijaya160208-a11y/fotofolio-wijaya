import { useRef, useState } from "react";
import { projects } from "../../data/projects";
import { PortfolioSection } from "../shared/PortfolioSection";
import { Reveal } from "../shared/Reveal";
import { ArrowUpRight } from "lucide-react";
import { HudLine, MicroLabel } from "../shared/decorations";

type Project = (typeof projects)[number];

function RowMeta({ project }: { project: Project }) {
  return (
    <span className="flex items-center gap-3">
      <MicroLabel className="text-muted">{project.category}</MicroLabel>
      <span className="h-3 w-px bg-line" aria-hidden="true" />
      <MicroLabel className="text-muted">{project.year}</MicroLabel>
    </span>
  );
}

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
      className="group relative border-t border-line transition-colors duration-300 last:border-b hover:bg-paper/60"
    >
      {/* Mobile / touch: inline image */}
      <div className="overflow-hidden px-1 pt-5 lg:hidden">
        <img
          src={project.image}
          alt={`Pratinjau proyek ${project.title}`}
          width={800}
          height={450}
          loading={index < 2 ? "eager" : "lazy"}
          decoding="async"
          className="aspect-[16/9] w-full rounded-[12px] border border-line object-cover grayscale"
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
            <h3 className="truncate font-display text-[clamp(28px,4.5vw,60px)] uppercase leading-[0.95] text-ink transition-transform duration-300 ease-out group-hover:translate-x-2">
              {project.title}
            </h3>
          </div>
          <p className="mt-2 font-mono text-[9.5px] uppercase leading-relaxed tracking-[0.14em] text-muted">
            {project.tags.join(" · ")}
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
        <div className="hidden shrink-0 flex-col items-end gap-2 sm:flex">
          <RowMeta project={project} />
          <ArrowUpRight
            size={22}
            strokeWidth={1.5}
            aria-hidden="true"
            className="text-tech transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-burgundy"
          />
        </div>
      </div>
    </article>
  );
}

export function ProjectsSection() {
  const [active, setActive] = useState<number | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  const previewRef = useRef<HTMLDivElement | null>(null);
  const finePointer = useRef(
    typeof window !== "undefined" &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches,
  );

  const onMove = (e: React.MouseEvent) => {
    if (!finePointer.current) return;
    const list = listRef.current;
    const prev = previewRef.current;
    if (!list || !prev) return;
    const r = list.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    prev.style.transform = `translate(${x + 28}px, ${y - 110}px)`;
  };

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
              Kumpulan proyek terpilih. Ganti dengan karya nyata di src/data/projects.ts
            </p>
          </div>
        </Reveal>
        <HudLine className="mb-8" width="100%" />

        <div
          ref={listRef}
          onMouseMove={onMove}
          onMouseLeave={() => setActive(null)}
          className="relative"
        >
          {/* Floating preview — desktop fine-pointer only */}
          <div
            ref={previewRef}
            aria-hidden="true"
            className={`pointer-events-none absolute left-0 top-0 z-20 hidden h-[220px] w-[300px] overflow-hidden rounded-[14px] border border-line shadow-[0_24px_60px_rgba(23,35,45,.3)] transition-opacity duration-300 lg:block ${
              active === null ? "opacity-0" : "opacity-100"
            }`}
          >
            {projects.map((p, i) => (
              <img
                key={p.id}
                src={p.image}
                alt=""
                width={600}
                height={440}
                loading="lazy"
                decoding="async"
                className={`absolute inset-0 h-full w-full object-cover grayscale transition-opacity duration-300 ${
                  active === i ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
          </div>

          {projects.map((p, i) => (
            <ProjectRow key={p.id} project={p} index={i} onEnter={() => setActive(i)} />
          ))}
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
