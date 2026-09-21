import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { caseStudy } from "../../data/caseStudies";
import { PortfolioSection } from "../shared/PortfolioSection";
import { MicroLabel, TechnicalCorner } from "../shared/decorations";

const phases = [
  { key: "challenge", label: "CHALLENGE", text: caseStudy.challenge },
  { key: "solution", label: "SOLUTION", text: caseStudy.solution },
  { key: "result", label: "RESULT", text: caseStudy.result },
];

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

        <motion.div
          style={{ y: titleY, opacity: titleOpacity }}
          className="absolute inset-x-0 top-[18%] flex flex-col items-center px-10 text-center"
        >
          <MicroLabel className="text-gold">{caseStudy.category} / {caseStudy.index}</MicroLabel>
          <h2 className="mt-4 font-display text-7xl uppercase leading-[0.85] text-paper drop-shadow-lg xl:text-8xl">
            {caseStudy.title}
          </h2>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <MicroLabel className="text-paper/70">ROLE — {caseStudy.role}</MicroLabel>
            <MicroLabel className="text-paper/70">{caseStudy.duration}</MicroLabel>
            <MicroLabel className="text-paper/70">{caseStudy.tools.join(" / ")}</MicroLabel>
          </div>
        </motion.div>

        <div className="absolute inset-x-0 bottom-0 px-[clamp(40px,6vw,110px)] pb-[7vh]">
          <div className="flex items-end justify-between gap-10">
            {phases.map((p, i) => {
              const start = 0.22 + i * 0.2;
              const end = start + 0.2;
              return <PhasePanel key={p.key} phase={p} progress={scrollYProgress} start={start} end={end} reduce={reduce} />;
            })}
          </div>
          <div className="mt-8 flex items-center gap-4">
            <span className="h-px flex-1 bg-paper/20" />
            <MicroLabel className="text-paper/45">CASE STUDY {caseStudy.index}</MicroLabel>
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
  phase: { key: string; label: string; text: string };
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  start: number;
  end: number;
  reduce: boolean | null;
}) {
  const opacity = useTransform(progress, [start - 0.06, start, end, end + 0.08], reduce ? [1, 1, 1, 1] : [0, 1, 1, 0.15]);
  const y = useTransform(progress, [start - 0.06, start], reduce ? [0, 0] : [18, 0]);
  return (
    <motion.div style={{ opacity, y }} className="max-w-[320px]">
      <div className="mb-3 flex items-center gap-2.5">
        <span className="h-1.5 w-1.5 rounded-full bg-gold" />
        <MicroLabel className="text-gold">{phase.label}</MicroLabel>
      </div>
      <p className="text-[12.5px] leading-relaxed text-paper/85">{phase.text}</p>
    </motion.div>
  );
}

function VerticalCaseStudy() {
  return (
    <div className="flex flex-col gap-8 px-1 lg:hidden">
      <div className="overflow-hidden rounded-[16px] border border-line">
        <img
          src={caseStudy.image}
          alt={`Visual proyek ${caseStudy.title}`}
          className="h-[200px] w-full object-cover grayscale"
          loading="lazy"
        />
      </div>
      <div>
        <MicroLabel className="text-burgundy">{caseStudy.category} / {caseStudy.index}</MicroLabel>
        <h2 className="mt-3 font-display text-5xl uppercase leading-[0.85] text-ink">
          {caseStudy.title}
        </h2>
        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5">
          <MicroLabel>ROLE — {caseStudy.role}</MicroLabel>
          <MicroLabel>{caseStudy.duration}</MicroLabel>
        </div>
      </div>
      {phases.map((p) => (
        <div key={p.key} className="relative rounded-[14px] border border-line bg-paper/85 p-5">
          <TechnicalCorner variant="top-left" size={11} />
          <MicroLabel className="text-burgundy">{p.label}</MicroLabel>
          <p className="mt-2.5 text-[12.5px] leading-relaxed text-ink/80">{p.text}</p>
        </div>
      ))}
      <div className="grid grid-cols-3 gap-3">
        {caseStudy.metrics.map((m, i) => (
          <div key={`metric-${i}`} className="rounded-[12px] bg-panel p-3.5 text-center">
            <span className="block font-display text-2xl leading-none text-gold">{m.value}</span>
            <MicroLabel className="mt-1.5 text-paper/55">{m.label}</MicroLabel>
          </div>
        ))}
      </div>
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
