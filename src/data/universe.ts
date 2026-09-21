/**
 * Section 11 — WIJAYA CODE UNIVERSE (PRD V5 §7–§29).
 * Orbital system over the subject's real toolchain. Every node below is
 * something actually used in this project — no invented credentials.
 */
export type PlanetBody =
  | "mercury" | "venus" | "earth" | "mars" | "jupiter"
  | "saturn" | "uranus" | "neptune" | "pluto" | "moon" | "ice";

export type UniverseNode = {
  id: string;
  name: string;
  category: string;
  type: "technology" | "tool" | "interest" | "exploration";
  orbit: number;
  size: number;
  speed: number;
  /** Real planetary body rendered for this node (textures in public/assets/planets). */
  body: PlanetBody;
  /** Extra dressing: saturn ring / earth clouds. */
  ring?: boolean;
  clouds?: boolean;
  /** Tint multiplier for shared textures (moon/ice). */
  tint?: string;
  spin?: number;
  description?: string;
};

export const universeOrbits = [
  { id: "core", name: "CORE TECHNOLOGIES", radius: 2.4 },
  { id: "engineering", name: "ENGINEERING", radius: 3.7 },
  { id: "creative", name: "CREATIVE", radius: 5.0 },
  { id: "tooling", name: "TOOLING", radius: 6.3 },
  { id: "exploration", name: "EXPLORATION", radius: 7.5 },
] as const;

export const universeNodes: UniverseNode[] = [
  // Orbit 01 — core stack (major planets)
  { id: "javascript", name: "JavaScript", category: "FRONTEND", type: "technology", orbit: 1, size: 0.62, speed: 0.055, body: "jupiter", spin: 0.18, description: "Modern ES syntax and browser fundamentals." },
  { id: "typescript", name: "TypeScript", category: "FRONTEND", type: "technology", orbit: 1, size: 0.58, speed: 0.055, body: "saturn", ring: true, spin: 0.16, description: "Typed, maintainable application code." },
  { id: "react", name: "React", category: "FRONTEND", type: "technology", orbit: 1, size: 0.55, speed: 0.055, body: "earth", clouds: true, spin: 0.28, description: "Component-driven interfaces with hooks and state." },
  // Orbit 02 — engineering (terrestrial planets)
  { id: "node", name: "Node.js", category: "BACKEND", type: "technology", orbit: 2, size: 0.44, speed: 0.040, body: "mars", spin: 0.22, description: "Runtime for servers and tooling." },
  { id: "python", name: "Python", category: "PROGRAMMING", type: "technology", orbit: 2, size: 0.44, speed: 0.040, body: "neptune", spin: 0.2, description: "Scripting, automation, and learning." },
  { id: "api", name: "REST API", category: "BACKEND", type: "technology", orbit: 2, size: 0.40, speed: 0.040, body: "venus", spin: 0.12, description: "Endpoint design and contracts." },
  // Orbit 03 — creative (rocky / ice worlds)
  { id: "motion", name: "Motion", category: "CREATIVE", type: "interest", orbit: 3, size: 0.36, speed: 0.052, body: "mercury", spin: 0.14, description: "Purposeful micro-interactions." },
  { id: "generative", name: "Generative Art", category: "CREATIVE", type: "interest", orbit: 3, size: 0.36, speed: 0.052, body: "uranus", spin: 0.1, description: "Code as a visual medium." },
  { id: "editorial", name: "Editorial Layout", category: "CREATIVE", type: "interest", orbit: 3, size: 0.36, speed: 0.052, body: "pluto", spin: 0.12, description: "Art-directed composition." },
  // Orbit 04 — tooling (moons)
  { id: "git", name: "Git", category: "VERSION CONTROL", type: "tool", orbit: 4, size: 0.28, speed: 0.028, body: "moon", spin: 0.1, description: "Version-control workflow." },
  { id: "github", name: "GitHub", category: "VERSION CONTROL", type: "tool", orbit: 4, size: 0.28, speed: 0.028, body: "moon", tint: "#cfd8de", spin: 0.1, description: "Collaboration and code hosting." },
  { id: "figma", name: "Figma", category: "DESIGN", type: "tool", orbit: 4, size: 0.28, speed: 0.028, body: "moon", tint: "#e8d9c8", spin: 0.1, description: "Interface design and handoff." },
  { id: "vscode", name: "VS Code", category: "EDITOR", type: "tool", orbit: 4, size: 0.28, speed: 0.028, body: "moon", tint: "#c8d4e8", spin: 0.1, description: "Daily editor environment." },
  { id: "opencode", name: "OpenCode", category: "EDITOR", type: "tool", orbit: 4, size: 0.28, speed: 0.028, body: "moon", tint: "#d8c8e0", spin: 0.1, description: "AI-assisted engineering." },
  // Orbit 05 — exploration (distant icy bodies, procedural)
  { id: "ai", name: "AI", category: "EXPLORATION", type: "exploration", orbit: 5, size: 0.22, speed: 0.020, body: "ice", tint: "#bcd2e0", spin: 0.08, description: "Assisted workflows and agents." },
  { id: "three", name: "3D / WebGL", category: "EXPLORATION", type: "exploration", orbit: 5, size: 0.22, speed: 0.020, body: "ice", tint: "#c8dce8", spin: 0.08, description: "Real-time graphics in the browser." },
  { id: "expweb", name: "Experimental Web", category: "EXPLORATION", type: "exploration", orbit: 5, size: 0.22, speed: 0.020, body: "ice", tint: "#d0e4ea", spin: 0.08, description: "Shaders, canvas, and new APIs." },
];

export const universeMeta = {
  system: "WIJAYA.CODE",
  status: "ACTIVE",
  label: "11 / CODE UNIVERSE",
  intro: "ENTERING CODE UNIVERSE",
  nodes: String(universeNodes.length).padStart(2, "0"),
};
