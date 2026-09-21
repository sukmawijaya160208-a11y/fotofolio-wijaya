import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { processStages, processRoute } from "../../data/journey";
import { PortfolioSection } from "../shared/PortfolioSection";
import { Crosshair, DataPoint, MicroLabel, TechnicalCorner } from "../shared/decorations";

const STAGES = processStages;

/**
 * Serpentine route through a 3×2 node grid, in viewBox units 0..100.
 * Node centres sit at col (c+0.5)/3 and row (r+0.5)/2 so the stretched
 * overlay stays aligned to the grid at any width.
 */
const NODE_X = [1 / 6, 3 / 6, 5 / 6];
const NODE_Y = [1 / 4, 3 / 4];
const ROUTE = [
  [NODE_X[0], NODE_Y[0]],
  [NODE_X[1], NODE_Y[0]],
  [NODE_X[2], NODE_Y[0]],
  [NODE_X[2], NODE_Y[1]],
  [NODE_X[1], NODE_Y[1]],
  [NODE_X[0], NODE_Y[1]],
] as const;

const ROUTE_PATH = ROUTE.map(
  ([x, y], i) => `${i === 0 ? "M" : "L"} ${x * 100} ${y * 100}`,
).join(" ");

function StageNode({
  no,
  title,
  description,
  tools,
}: {
  no: string;
  title: string;
  description: string;
  tools: string[];
}) {
  return (
    <div className="relative flex flex-col gap-2.5 rounded-[12px] border border-line/60 bg-paper/[0.07] p-4 backdrop-blur-sm transition-colors duration-300 hover:border-gold/45 hover:bg-paper/[0.12]">
      <TechnicalCorner variant="top-left" size={10} />
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] tracking-[0.2em] text-gold/80">{no}</span>
        <span className="h-1.5 w-1.5 rounded-full bg-gold/70" aria-hidden="true" />
      </div>
      <h3 className="font-display text-2xl uppercase leading-none text-paper">{title}</h3>
      <p className="text-[11.5px] leading-relaxed text-paper/65">{description}</p>
      <div className="mt-auto flex flex-wrap gap-1.5 pt-1">
        {tools.map((t) => (
          <span
            key={t}
            className="font-mono text-[8.5px] uppercase tracking-[0.14em] text-tech/70"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function WireframeArtifact() {
  return (
    <div className="rounded-[12px] border border-line/60 bg-paper/[0.05] p-4">
      <MicroLabel className="text-paper/45">WIREFRAME / SPECIMEN</MicroLabel>
      <div className="mt-3 space-y-1.5" aria-hidden="true">
        <div className="h-3 w-2/3 rounded-[2px] bg-paper/25" />
        <div className="h-10 rounded-[2px] border border-dashed border-paper/25" />
        <div className="grid grid-cols-2 gap-1.5">
          <div className="h-6 rounded-[2px] bg-paper/15" />
          <div className="h-6 rounded-[2px] bg-paper/15" />
        </div>
        <div className="h-2.5 w-3/4 rounded-[2px] bg-paper/15" />
        <div className="h-2.5 w-1/2 rounded-[2px] bg-paper/15" />
      </div>
    </div>
  );
}

function CodeArtifact() {
  return (
    <div className="rounded-[12px] border border-line/60 bg-ink/40 p-4 font-mono text-[10px] leading-relaxed text-paper/70">
      <div className="mb-2 flex items-center gap-1.5">
        <span className="h-2 w-2 rounded-full bg-burgundy/80" />
        <MicroLabel className="text-paper/45">CODE / SPECIMEN</MicroLabel>
      </div>
      <pre className="whitespace-pre-wrap break-words" aria-hidden="true">
{`const stage = (idea) => {
  const plan = structure(idea);
  return build(test(plan));
};`}
      </pre>
    </div>
  );
}

function ToolRail() {
  const tools = ["GIT", "GITHUB", "FIGMA", "VSCODE", "OPENCODE"];
  return (
    <div className="rounded-[12px] border border-line/60 bg-paper/[0.05] p-4">
      <MicroLabel className="text-paper/45">TOOL RAIL</MicroLabel>
      <ul className="mt-3 divide-y divide-line/30">
        {tools.map((t) => (
          <li
            key={t}
            className="flex items-center justify-between py-1.5 font-mono text-[10px] tracking-[0.16em] text-paper/70"
          >
            <span>{t}</span>
            <span className="text-gold/60" aria-hidden="true">
              ▸
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function BlueprintBoard() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Faint full route is always visible; scroll only activates the draw.
  const draw = useTransform(scrollYProgress, [0.15, 0.85], [0, 1]);
  const glow = useTransform(scrollYProgress, [0.15, 0.85], [0.35, 1]);

  return (
    <div
      ref={ref}
      className="relative overflow-hidden rounded-[18px] border border-line/50 bg-panel/60 p-5 sm:p-7"
    >
      {/* blueprint grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(rgba(248,250,251,.055) 1px, transparent 1px), linear-gradient(90deg, rgba(248,250,251,.055) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <Crosshair className="left-3 top-3" />
      <Crosshair className="right-3 top-3" />
      <Crosshair className="bottom-3 left-3" />
      <Crosshair className="bottom-3 right-3" />

      <div className="relative mb-5 flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <MicroLabel className="text-paper/45">ROUTE</MicroLabel>
          <p className="mt-1 font-mono text-[11px] tracking-[0.14em] text-gold/80">
            {processRoute}
          </p>
        </div>
        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-paper/40">
          GRID / 12 COL · SCALE 1:1
        </span>
      </div>

      <div className="relative">
        {/* route overlay: static faint line + scroll-drawn active line */}
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          <path
            d={ROUTE_PATH}
            fill="none"
            stroke="rgba(211,165,45,0.22)"
            strokeWidth={0.5}
            vectorEffect="non-scaling-stroke"
          />
          <motion.path
            d={ROUTE_PATH}
            fill="none"
            stroke="rgba(211,165,45,0.9)"
            strokeWidth={1}
            vectorEffect="non-scaling-stroke"
            style={{ pathLength: reduce ? 1 : draw, opacity: reduce ? 0.6 : glow }}
          />
          {ROUTE.map(([x, y], i) => (
            <circle
              key={i}
              cx={x * 100}
              cy={y * 100}
              r={0.8}
              fill="rgba(211,165,45,0.8)"
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </svg>

        <div className="relative grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {STAGES.map((s) => (
            <StageNode key={s.no} {...s} />
          ))}
        </div>
      </div>

      <div className="relative mt-5 flex items-center justify-between">
        <span className="font-hand text-2xl text-gold">next iteration →</span>
        <MicroLabel className="text-paper/40">{`${STAGES.length} STAGES · LOOP`}</MicroLabel>
      </div>
    </div>
  );
}

export function JourneySection() {
  return (
    <PortfolioSection
      id="journey"
      index={3}
      label="JOURNEY · PROCESS BLUEPRINT"
      theme="dark"
      bleed
      className="overflow-hidden"
    >
      <div className="px-6 py-20 md:px-10 lg:px-[clamp(40px,6vw,96px)]">
        {/* header */}
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-4xl uppercase leading-[0.95] text-paper sm:text-5xl">
              WIJAYA PROCESS
              <br />
              <span className="text-gold">BLUEPRINT</span>
            </h2>
            <p className="mt-3 max-w-md text-[12.5px] leading-relaxed text-paper/60">
              Cara kerja dari ide sampai live: satu loop yang berulang.
              Setiap hasil jadi input iterasi berikutnya.
            </p>
          </div>
          <DataPoint className="hidden sm:block" label="A-03 / ROUTE" />
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_300px]">
          <BlueprintBoard />
          <div className="flex flex-col gap-4">
            <WireframeArtifact />
            <CodeArtifact />
            <ToolRail />
          </div>
        </div>

      </div>
    </PortfolioSection>
  );
}
