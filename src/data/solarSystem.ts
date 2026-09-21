/**
 * SECTION 11 — SOLAR SYSTEM OBSERVATORY (PRD MASTER §34).
 * Astronomical visualization data. Presentation scale, NOT scientific scale —
 * the UI states this explicitly (PRD §13). Textures live in
 * public/assets/planets (self-hosted, NASA-derived via threex.planets).
 */
export type CelestialBody = {
  id: string;
  name: string;
  texture: string;
  radius: number;
  orbitRadius: number;
  orbitSpeed: number;
  rotationSpeed: number;
  /** Axial tilt in degrees (real values: Earth 23.4, Saturn 26.7, Uranus 97.8). */
  tilt?: number;
  ring?: boolean;
  clouds?: boolean;
};

const P = (f: string) => `/assets/planets/${f}`;

export const SUN_TEXTURE = P("2k_sun.jpg");
export const EARTH_CLOUDS_TEXTURE = P("2k_earth_clouds.jpg");
export const EARTH_NIGHT_TEXTURE = P("2k_earth_nightmap.jpg");
export const SATURN_RING_TEXTURE = P("2k_saturn_ring_alpha.png");
export const MILKY_WAY_TEXTURE = P("2k_stars_milky_way.jpg");

/** Planetary texture credit (CC-BY 4.0) — shown in README + screen-reader block. */
export const TEXTURE_CREDIT = "Planetary textures: Solar System Scope (CC-BY 4.0), NASA";

export const celestialBodies: CelestialBody[] = [
  { id: "mercury", name: "MERCURY", texture: P("2k_mercury.jpg"), radius: 0.2, orbitRadius: 2.4, orbitSpeed: 0.05, rotationSpeed: 0.06, tilt: 0.03 },
  { id: "venus", name: "VENUS", texture: P("2k_venus_atmosphere.jpg"), radius: 0.32, orbitRadius: 3.1, orbitSpeed: 0.042, rotationSpeed: -0.05, tilt: 177.4 },
  { id: "earth", name: "EARTH", texture: P("2k_earth_daymap.jpg"), radius: 0.36, orbitRadius: 3.7, orbitSpeed: 0.036, rotationSpeed: 0.28, tilt: 23.4, clouds: true },
  { id: "mars", name: "MARS", texture: P("2k_mars.jpg"), radius: 0.28, orbitRadius: 4.4, orbitSpeed: 0.03, rotationSpeed: 0.24, tilt: 25.2 },
  { id: "jupiter", name: "JUPITER", texture: P("2k_jupiter.jpg"), radius: 0.62, orbitRadius: 5.2, orbitSpeed: 0.022, rotationSpeed: 0.4, tilt: 3.1 },
  { id: "saturn", name: "SATURN", texture: P("2k_saturn.jpg"), radius: 0.55, orbitRadius: 6.0, orbitSpeed: 0.018, rotationSpeed: 0.36, tilt: 26.7, ring: true },
  { id: "uranus", name: "URANUS", texture: P("2k_uranus.jpg"), radius: 0.4, orbitRadius: 6.8, orbitSpeed: 0.014, rotationSpeed: -0.2, tilt: 97.8 },
  { id: "neptune", name: "NEPTUNE", texture: P("2k_neptune.jpg"), radius: 0.38, orbitRadius: 7.5, orbitSpeed: 0.012, rotationSpeed: 0.22, tilt: 28.3 },
];

export const OBSERVATORY = {
  eyebrow: "SECTION 11 / DEEP SPACE OBSERVATORY",
  title: "THE SOLAR SYSTEM",
  sub: "Explore the systems, tools, and work behind the interface.",
  scaleNote: "INTERACTIVE VISUALIZATION — NOT TO SCALE",
  system: "WIJAYA // SYSTEM",
  status: "ONLINE",
} as const;
