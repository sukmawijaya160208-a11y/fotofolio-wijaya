/**
 * Section 04 — WIJAYA TECHNICAL WORKBENCH (PRD V3 §10 / §48).
 * Skills are plugged into a workflow route, not floating in a generic
 * constellation. No proficiency percentages, no circular meters —
 * only real tooling and capability groups.
 */
export type WorkflowStage = {
  title: string;
  annotation: string;
};

export const workflowStages: WorkflowStage[] = [
  { title: "IDEA", annotation: "problem first" },
  { title: "STRUCTURE", annotation: "plan the system" },
  { title: "DESIGN", annotation: "layout + tokens" },
  { title: "CODE", annotation: "build it clean" },
  { title: "TEST", annotation: "break before users" },
  { title: "SHIP", annotation: "deploy + document" },
];

export type Skill = {
  name: string;
  description: string;
};

export type CapabilityModule = {
  id: string;
  no: string;
  name: string;
  /** Where this module plugs into the workflow route. */
  stage: string;
  skills: Skill[];
};

export const capabilityModules: CapabilityModule[] = [
  {
    id: "frontend",
    no: "01",
    name: "FRONTEND",
    stage: "CODE",
    skills: [
      { name: "React", description: "Component-driven interfaces with hooks and state." },
      { name: "TypeScript", description: "Typed, maintainable application code." },
      { name: "JavaScript", description: "Modern ES syntax and browser fundamentals." },
      { name: "HTML", description: "Semantic, accessible document structure." },
      { name: "CSS", description: "Layout, motion, and design-token systems." },
      { name: "Tailwind", description: "Utility-first styling at scale." },
    ],
  },
  {
    id: "backend",
    no: "02",
    name: "BACKEND",
    stage: "CODE",
    skills: [
      { name: "Node.js", description: "Runtime for servers and tooling." },
      { name: "Express", description: "Minimal REST API layer." },
      { name: "REST API", description: "Endpoint design and contracts." },
      { name: "Database", description: "SQL basics and data modeling." },
    ],
  },
  {
    id: "uiux",
    no: "03",
    name: "UI / UX",
    stage: "DESIGN",
    skills: [
      { name: "Wireframing", description: "Structure before pixels." },
      { name: "Prototyping", description: "Interaction flows before production." },
      { name: "Visual Systems", description: "Tokens, type scales, consistency." },
    ],
  },
  {
    id: "creative",
    no: "04",
    name: "CREATIVE DEVELOPMENT",
    stage: "DESIGN",
    skills: [
      { name: "Motion", description: "Purposeful micro-interactions." },
      { name: "Generative Art", description: "Code as a visual medium." },
      { name: "Editorial Layout", description: "Art-directed composition." },
    ],
  },
  {
    id: "tooling",
    no: "05",
    name: "TOOLING",
    stage: "SHIP",
    skills: [
      { name: "Git", description: "Version-control workflow." },
      { name: "GitHub", description: "Collaboration and code hosting." },
      { name: "Figma", description: "Interface design and handoff." },
      { name: "VS Code", description: "Daily editor environment." },
      { name: "OpenCode", description: "AI-assisted engineering." },
    ],
  },
  {
    id: "workflow",
    no: "06",
    name: "WORKFLOW",
    stage: "SHIP",
    skills: [
      { name: "Iterate", description: "Small loops, fast feedback." },
      { name: "Document", description: "Decisions and handoff notes." },
      { name: "Review", description: "Critique before merge." },
    ],
  },
];

/** Tool rail labels (PRD §48.4 C). */
export const toolRail = ["GIT", "GITHUB", "FIGMA", "VSCODE", "OPENCODE"];

/** Kept for backward compatibility with any legacy imports. */
export const skillCategories = capabilityModules;
export const skillCore = "WIJAYA TECHNICAL WORKBENCH";
