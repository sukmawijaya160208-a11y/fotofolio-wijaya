import { useState } from "react";
import { capabilityModules, toolRail, workflowStages } from "../../data/skills";
import { PortfolioSection } from "../shared/PortfolioSection";
import { Reveal } from "../shared/Reveal";
import { Crosshair, DataPoint, HudLine, MicroLabel, TechnicalCorner } from "../shared/decorations";

function WorkflowStrip() {
  const [active, setActive] = useState<number | null>(null);
  return (
    <div className="relative rounded-[14px] border border-line bg-paper/70 p-4 sm:p-5">
      <div className="mb-3 flex items-center justify-between">
        <MicroLabel>CORE WORKFLOW</MicroLabel>
        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-tech/60">
          ROUTE / LINEAR
        </span>
      </div>
      <ol className="flex flex-wrap items-center gap-y-3 sm:flex-nowrap sm:gap-0">
        {workflowStages.map((s, i) => (
          <li
            key={s.title}
            className="flex flex-1 items-center gap-2 sm:flex-none"
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(null)}
          >
            <div
              className={`flex shrink-0 flex-col rounded-[8px] border px-2.5 py-1.5 transition-colors duration-300 sm:px-3 ${
                active === i
                  ? "border-burgundy/45 bg-burgundy/[0.07]"
                  : "border-line bg-bg-white"
              }`}
            >
              <span className="font-display text-sm uppercase leading-none text-ink sm:text-base">
                {s.title}
              </span>
              <span className="mt-0.5 font-mono text-[8px] uppercase tracking-[0.12em] text-muted">
                {s.annotation}
              </span>
            </div>
            {i < workflowStages.length - 1 && (
              <span
                className="mx-0.5 shrink-0 font-mono text-[11px] text-tech/50 sm:mx-1"
                aria-hidden="true"
              >
                →
              </span>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

function ModuleCard({
  module,
  onHover,
  active,
}: {
  module: (typeof capabilityModules)[number];
  onHover: (id: string | null) => void;
  active: boolean;
}) {
  return (
    <button
      type="button"
      className={`group relative flex flex-col gap-2 rounded-[12px] border bg-paper/85 p-4 text-left transition-all duration-300 hover:-translate-y-0.5 ${
        active
          ? "border-burgundy/45 shadow-[0_12px_28px_rgba(23,35,45,.16)]"
          : "border-line shadow-[0_4px_12px_rgba(23,35,45,.06)]"
      }`}
      onMouseEnter={() => onHover(module.id)}
      onMouseLeave={() => onHover(null)}
      onFocus={() => onHover(module.id)}
      onBlur={() => onHover(null)}
      aria-expanded={active}
    >
      <TechnicalCorner variant="top-right" size={10} />
      <div className="flex items-baseline justify-between">
        <span className="font-mono text-[9.5px] tracking-[0.2em] text-tech/70">{module.no}</span>
        <span className="font-mono text-[8.5px] uppercase tracking-[0.14em] text-burgundy/70">
          ▸ {module.stage}
        </span>
      </div>
      <h3 className="font-display text-lg uppercase leading-none text-ink sm:text-xl">
        {module.name}
      </h3>
      <ul className="flex flex-wrap gap-1">
        {module.skills.map((s) => (
          <li
            key={s.name}
            className="rounded-sm bg-bg-deep px-1.5 py-0.5 font-mono text-[8.5px] uppercase tracking-[0.1em] text-muted"
          >
            {s.name}
          </li>
        ))}
      </ul>
    </button>
  );
}

function WireframeSpecimen() {
  return (
    <div className="rounded-[12px] border border-line bg-paper/70 p-4">
      <MicroLabel>WIREFRAME / SPECIMEN</MicroLabel>
      <div className="mt-3 space-y-1.5" aria-hidden="true">
        <div className="h-3 w-2/3 rounded-[2px] bg-tech/20" />
        <div className="h-10 rounded-[2px] border border-dashed border-tech/30" />
        <div className="grid grid-cols-2 gap-1.5">
          <div className="h-6 rounded-[2px] bg-tech/15" />
          <div className="h-6 rounded-[2px] bg-tech/15" />
        </div>
        <div className="h-2.5 w-3/4 rounded-[2px] bg-tech/15" />
      </div>
    </div>
  );
}

function CodeSpecimen() {
  return (
    <div className="rounded-[12px] border border-line bg-ink/90 p-4 font-mono text-[10px] leading-relaxed text-paper/75">
      <div className="mb-2 flex items-center gap-1.5">
        <span className="h-2 w-2 rounded-full bg-gold/80" />
        <MicroLabel className="text-paper/45">CODE / SPECIMEN</MicroLabel>
      </div>
      <pre className="whitespace-pre-wrap break-words" aria-hidden="true">
{`// workbench.ts
const ship = (idea: string) =>
  test(code(design(structure(idea))));`}
      </pre>
    </div>
  );
}

function ToolRailCard() {
  return (
    <div className="rounded-[12px] border border-line bg-paper/70 p-4">
      <MicroLabel>TOOL RAIL</MicroLabel>
      <ul className="mt-3 divide-y divide-line/40">
        {toolRail.map((t) => (
          <li
            key={t}
            className="flex items-center justify-between py-1.5 font-mono text-[10px] tracking-[0.16em] text-ink/75"
          >
            <span>{t}</span>
            <span className="text-burgundy/60" aria-hidden="true">
              ▸
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Workbench() {
  const [active, setActive] = useState<string | null>(null);
  const activeModule = capabilityModules.find((m) => m.id === active);

  return (
    <div className="relative">
      <WorkflowStrip />

      <div
        className="mt-4 min-h-[52px] rounded-[12px] border bg-paper/95 p-3 transition-opacity duration-300"
        aria-live="polite"
      >
        {activeModule ? (
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
            <MicroLabel className="text-burgundy">{activeModule.name}</MicroLabel>
            <span className="h-3 w-px bg-line" />
            {activeModule.skills.map((s) => (
              <span
                key={s.name}
                className="font-mono text-[10px] text-ink/85"
                title={s.description}
              >
                {s.name}
              </span>
            ))}
            <span className="ml-auto font-mono text-[9px] uppercase tracking-[0.16em] text-tech/60">
              used in {activeModule.stage}
            </span>
          </div>
        ) : (
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
            hover a module to inspect ▸
          </span>
        )}
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {capabilityModules.map((m) => (
          <ModuleCard
            key={m.id}
            module={m}
            active={active === m.id}
            onHover={setActive}
          />
        ))}
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <WireframeSpecimen />
        <CodeSpecimen />
        <ToolRailCard />
      </div>

      <Crosshair className="right-2 top-2" />
      <DataPoint className="bottom-2 right-2" label="04 / WORKBENCH" />
    </div>
  );
}

export function SkillsSection() {
  return (
    <PortfolioSection
      id="skills"
      index={4}
      label="SKILLS · TECHNICAL WORKBENCH"
      theme="light"
      className="flex items-center py-[var(--section-pad)]"
      minHeight="110vh"
    >
      <div className="relative z-10 w-full">
        <Reveal className="mb-8 flex flex-col items-start gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <MicroLabel>WHAT I CAN DO</MicroLabel>
            <h2 className="mt-3 font-display text-4xl uppercase leading-[0.95] text-ink md:text-5xl">
              WIJAYA TECHNICAL
              <br />
              <span className="text-burgundy">WORKBENCH</span>
            </h2>
          </div>
          <div className="text-right">
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-tech/60">
              GRID / 12 COL
            </span>
            <HudLine className="mt-1.5 w-[120px]" />
          </div>
        </Reveal>

        <Workbench />
      </div>
    </PortfolioSection>
  );
}
