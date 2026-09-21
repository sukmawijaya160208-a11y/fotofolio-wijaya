import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { caseStudy } from "../../data/caseStudies";
import { PortfolioSection } from "../shared/PortfolioSection";
import {
  BlueprintFrame,
  GridOverlay,
  MicroLabel,
  TechnicalCorner,
} from "../shared/decorations";

type Phase = {
  key: string;
  no: string;
  label: string;
  text?: string;
  steps?: string[];
};

const phases: Phase[] = [
  { key: "problem", no: "01", label: "PROBLEM", text: caseStudy.challenge },
  { key: "approach", no: "02", label: "APPROACH", text: caseStudy.solution },
  { key: "build", no: "03", label: "BUILD", steps: caseStudy.process },
  { key: "result", no: "04", label: "RESULT", text: caseStudy.result },
];

const metaRows = [
  { k: "ROLE", v: caseStudy.role },
  { k: "STACK", v: caseStudy.tools.join(" / ") },
  { k: "DURATION", v: caseStudy.duration },
];

function BlueprintOverlay() {
  return (
    <div className="pointer-events-none absolute inset-0 z-20" aria-hidden="true">
      <GridOverlay className="opacity-40" />
      <BlueprintFrame className="border-paper/15" />
      <TechnicalCorner variant="top-left" size={16} className="border-paper/30" />
      <TechnicalCorner variant="bottom-right" size={16} className="border-paper/30" />
      <span className="absolute left-5 top-4 font-mono text-[9px] tracking-[0.2em] text-paper/55">
        CASE / {caseStudy.index} · FRAME 16:9
      </span>
      <span className="absolute bottom-4 right-5 font-mono text-[9px] tracking-[0.2em] text-paper/55">
        IMAGE SLOT — ASSET PENDING
      </span>
    </div>
  );
}

function MetaRow({ light = false }: { light?: boolean }) {
  return (
    <div
      className={`flex flex-wrap items-center gap-x-6 gap-y-2 border-y ${
        light ? "border-line" : "border-white/12"
      } py-3`}
    >
      {metaRows.map((m) => (
        <span key={m.k} className="flex items-baseline gap-2">
          <MicroLabel className={light ? "text-muted" : "text-paper/45"}>
            {m.k}
          </MicroLabel>
          <span
            className={`font-mono text-[10.5px] uppercase tracking-[0.1em] ${
              light ? "text-ink/85" : "text-paper/85"
            }`}
          >
            {m.v}
          </span>
        </span>
      ))}
    </div>
  );
}

function CinematicCaseStudy() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1, 1.18]);
  const dim = useTransform(scrollYProgress, [0, 0.25, 0.5], [0.15, 0.45, 0.62]);
  const titleY = useTransform(scrollYProgress, [0, 0.2], reduce ? [0, 0] : [0, -40]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.18], [1, 0]);

  return (
    <div ref={ref} className="relative hidden h-[260vh] lg:block">
      <div className="sticky top-0 h-screen overflow-hidden bg-dark">
        <motion.img
          src={caseStudy.image}
          alt={`Visual proyek ${caseStudy.title}`}
          style={{ scale }}
          className="absolute inset-0 h-full w-full object-cover grayscale"
        />
        <motion.div
          className="absolute inset-0 bg-dark"
          style={{ opacity: dim }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/20 to-dark/60" />
        <BlueprintOverlay />

        <motion.div
          style={{ y: titleY, opacity: titleOpacity }}
          className="absolute inset-x-0 top-[16%] z-30 flex flex-col items-center px-10 text-center"
        >
          <MicroLabel className="text-gold">
            {caseStudy.category} / {caseStudy.index}
          </MicroLabel>
          <h2 className="mt-4 font-display text-7xl uppercase leading-[0.85] text-paper drop-shadow-lg xl:text-8xl">
            {caseStudy.title}
          </h2>
        </motion.div>

        <div className="absolute inset-x-0 bottom-0 z-30 px-[clamp(40px,6vw,110px)] pb-[7vh]">
          <div className="mb-7 max-w-[760px]">
            <MetaRow />
          </div>
          <div className="flex items-end justify-between gap-10">
            {phases.map((p, i) => {
              const start = 0.22 + i * 0.16;
              const end = start + 0.16;
              return (
                <PhasePanel
                  key={p.key}
                  phase={p}
                  progress={scrollYProgress}
                  start={start}
                  end={end}
                  reduce={reduce}
                />
              );
            })}
          </div>
          <div className="mt-8 flex items-center gap-4">
            <span className="h-px flex-1 bg-paper/20" />
            <a
              href="#projects"
              className="group inline-flex items-center gap-2.5 rounded-[10px] bg-paper px-5 py-3 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-panel transition-transform duration-200 hover:-translate-y-0.5"
            >
              ALL PROJECTS
              <ArrowRight
                size={14}
                strokeWidth={2}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </a>
            <span className="h-px flex-1 bg-paper/20" />
          </div>
        </div>
      </div>
    </div>
  );
}

function PhasePanel({
  phase,
  progress,
  start,
  end,
  reduce,
}: {
  phase: Phase;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  start: number;
  end: number;
  reduce: boolean | null;
}) {
  const opacity = useTransform(
    progress,
    [start - 0.06, start, end, end + 0.08],
    reduce ? [1, 1, 1, 1] : [0, 1, 1, 0.15],
  );
  const y = useTransform(progress, [start - 0.06, start], reduce ? [0, 0] : [18, 0]);
  return (
    <motion.div style={{ opacity, y }} className="max-w-[300px]">
      <div className="mb-3 flex items-center gap-2.5">
        <span className="font-mono text-[10px] tracking-[0.16em] text-gold/80">
          {phase.no}
        </span>
        <span className="h-1.5 w-1.5 rounded-full bg-gold" />
        <MicroLabel className="text-gold">{phase.label}</MicroLabel>
      </div>
      {phase.steps ? (
        <ol className="flex flex-col gap-1.5">
          {phase.steps.map((s, i) => (
            <li
              key={s}
              className="flex gap-2 text-[12px] leading-relaxed text-paper/85"
            >
              <span className="font-mono text-[10px] leading-[1.65] text-gold/70">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>{s}</span>
            </li>
          ))}
        </ol>
      ) : (
        <p className="text-[12.5px] leading-relaxed text-paper/85">{phase.text}</p>
      )}
    </motion.div>
  );
}

function VerticalCaseStudy() {
  return (
    <div className="flex flex-col gap-8 px-1 lg:hidden">
      <div className="relative overflow-hidden rounded-[16px] border border-line">
        <img
          src={caseStudy.image}
          alt={`Visual proyek ${caseStudy.title}`}
          className="aspect-[16/9] w-full object-cover grayscale"
          loading="lazy"
        />
        <span className="absolute bottom-3 right-4 font-mono text-[9px] tracking-[0.2em] text-paper/70">
          CASE / {caseStudy.index}
        </span>
      </div>
      <div>
        <MicroLabel className="text-burgundy">
          {caseStudy.category} / {caseStudy.index}
        </MicroLabel>
        <h2 className="mt-3 font-display text-5xl uppercase leading-[0.85] text-ink">
          {caseStudy.title}
        </h2>
      </div>
      <MetaRow light />
      {phases.map((p) => (
        <div
          key={p.key}
          className="relative rounded-[14px] border border-line bg-paper/85 p-5"
        >
          <TechnicalCorner variant="top-left" size={11} />
          <div className="mb-2.5 flex items-center gap-2.5">
            <span className="font-mono text-[10px] tracking-[0.16em] text-gold">
              {p.no}
            </span>
            <MicroLabel className="text-burgundy">{p.label}</MicroLabel>
          </div>
          {p.steps ? (
            <ol className="flex flex-col gap-1.5">
              {p.steps.map((s, i) => (
                <li
                  key={s}
                  className="flex gap-2 text-[12.5px] leading-relaxed text-ink/80"
                >
                  <span className="font-mono text-[10px] leading-[1.65] text-gold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{s}</span>
                </li>
              ))}
            </ol>
          ) : (
            <p className="text-[12.5px] leading-relaxed text-ink/80">{p.text}</p>
          )}
        </div>
      ))}
      <div className="grid grid-cols-3 gap-3">
        {caseStudy.metrics.map((m, i) => (
          <div key={`metric-${i}`} className="rounded-[12px] bg-panel p-3.5 text-center">
            <span className="block font-display text-2xl leading-none text-gold">
              {m.value}
            </span>
            <MicroLabel className="mt-1.5 text-paper/55">{m.label}</MicroLabel>
          </div>
        ))}
      </div>
      <a
        href="#projects"
        className="group inline-flex items-center justify-center gap-2.5 self-start rounded-[10px] bg-panel px-5 py-3 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-paper transition-transform duration-200 hover:-translate-y-0.5"
      >
        ALL PROJECTS
        <ArrowRight
          size={14}
          strokeWidth={2}
          className="transition-transform duration-200 group-hover:translate-x-1"
        />
      </a>
    </div>
  );
}

export function CaseStudySection() {
  return (
    <PortfolioSection id="case-study" index={7} label="CASE STUDY" theme="dark" bleed>
      <CinematicCaseStudy />
      <div className="px-6 py-20 md:px-10">
        <VerticalCaseStudy />
      </div>
    </PortfolioSection>
  );
}
