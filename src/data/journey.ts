/**
 * Section 03 — PROCESS BLUEPRINT (PRD V3 §9 / §47).
 * Process stages, not an employment history. Each stage describes how
 * Wijaya moves from idea to shipped work. Editable placeholders only —
 * no invented achievements, companies, or metrics.
 */
export type ProcessStage = {
  /** Stage number, e.g. "01". */
  no: string;
  /** Stage title, e.g. "DISCOVER". */
  title: string;
  /** One-line purpose. */
  description: string;
  /** 2–4 method labels shown as a technical tag row. */
  tools: string[];
};

export const processStages: ProcessStage[] = [
  {
    no: "01",
    title: "DISCOVER",
    description: "Understand the problem before touching the solution.",
    tools: ["OBSERVE", "QUESTION", "DEFINE"],
  },
  {
    no: "02",
    title: "LEARN",
    description: "Build the technical foundation the work will stand on.",
    tools: ["RESEARCH", "PRACTICE", "ITERATE"],
  },
  {
    no: "03",
    title: "BUILD",
    description: "Turn ideas into working, structured systems.",
    tools: ["CODE", "DESIGN", "COMPOSE"],
  },
  {
    no: "04",
    title: "TEST",
    description: "Break it before users have to.",
    tools: ["DEBUG", "REVIEW", "REFINE"],
  },
  {
    no: "05",
    title: "SHIP",
    description: "Make the work real and put it in front of people.",
    tools: ["DEPLOY", "PRESENT", "DOCUMENT"],
  },
  {
    no: "06",
    title: "GROW",
    description: "Use every result as the input for the next iteration.",
    tools: ["REFLECT", "IMPROVE", "REPEAT"],
  },
];

/** Route label used by the blueprint header annotation. */
export const processRoute = "IDEA → STRUCTURE → DESIGN → CODE → TEST → SHIP";

/** Kept for backward compatibility with any legacy vertical timeline copy. */
export const journey = processStages;
