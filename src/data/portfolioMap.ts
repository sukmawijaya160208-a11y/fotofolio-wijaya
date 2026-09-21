/**
 * SECTION 11 — portfolio mapping (PRD MASTER §14 / §29 / §34).
 * Every field below comes from real site data (profile, skills, education).
 * Bodies whose content is still placeholder slots report STATUS: PENDING
 * and never show invented names, metrics, or claims.
 */
import { profile } from "./profile";
import { capabilityModules } from "./skills";
import { education } from "./education";

export type PortfolioTarget = {
  id: string;
  title: string;
  category: string;
  status: "ACTIVE" | "PENDING";
  description: string;
  technologies?: string[];
  href: string;
  cta: string;
};

const mod = (id: string) => capabilityModules.find((m) => m.id === id)!;
const skillNames = (id: string) => mod(id).skills.map((s) => s.name);

export const portfolioTargets: PortfolioTarget[] = [
  {
    id: "sun",
    title: "WIJAYA — CORE",
    category: "IDENTITY",
    status: "ACTIVE",
    description: `${profile.name} — ${profile.role}. Based in ${profile.based}.`,
    technologies: profile.focus as unknown as string[],
    href: "#hero",
    cta: "VIEW IDENTITY",
  },
  {
    id: "mercury",
    title: "ABOUT",
    category: "PROFILE",
    status: "ACTIVE",
    description: profile.about,
    technologies: [...profile.tags],
    href: "#about",
    cta: "READ PROFILE",
  },
  {
    id: "venus",
    title: "DESIGN / UI",
    category: "CAPABILITY",
    status: "ACTIVE",
    description: "Interface structure before pixels — systems, flows, consistency.",
    technologies: skillNames("uiux"),
    href: "#skills",
    cta: "OPEN SKILL MODULE",
  },
  {
    id: "earth",
    title: "FRONTEND",
    category: "CAPABILITY",
    status: "ACTIVE",
    description: "Component-driven interfaces with typed, maintainable code.",
    technologies: skillNames("frontend"),
    href: "#skills",
    cta: "OPEN SKILL MODULE",
  },
  {
    id: "mars",
    title: "BACKEND",
    category: "CAPABILITY",
    status: "ACTIVE",
    description: "Runtime, APIs, and data modeling fundamentals.",
    technologies: skillNames("backend"),
    href: "#skills",
    cta: "OPEN SKILL MODULE",
  },
  {
    id: "jupiter",
    title: "PROJECT INDEX",
    category: "WORK",
    status: "PENDING",
    description: "04 draft slots reserved in the project index. Entries ship as the work lands — nothing staged here.",
    technologies: ["2024", "2025", "2026"],
    href: "#projects",
    cta: "OPEN PROJECT INDEX",
  },
  {
    id: "saturn",
    title: "EXPERIENCE LOG",
    category: "WORK",
    status: "PENDING",
    description: "03 log slots reserved. Roles and organizations appear here once confirmed — no placeholders presented as history.",
    technologies: [education.degree, education.status],
    href: "#work",
    cta: "OPEN EXPERIENCE LOG",
  },
  {
    id: "uranus",
    title: "CREATIVE EXPERIMENTS",
    category: "CAPABILITY",
    status: "ACTIVE",
    description: "Motion, generative visuals, and editorial composition as practice fields.",
    technologies: skillNames("creative"),
    href: "#creative-lab",
    cta: "OPEN CREATIVE LAB",
  },
  {
    id: "neptune",
    title: "CURRENT FOCUS",
    category: "TRAJECTORY",
    status: "ACTIVE",
    description: `Now: ${profile.focus.join(" · ")}. Next work starts as a conversation.`,
    technologies: skillNames("workflow"),
    href: "#contact",
    cta: "OPEN CHANNEL",
  },
];

export const targetById = (id: string | null): PortfolioTarget | null =>
  portfolioTargets.find((t) => t.id === id) ?? null;
