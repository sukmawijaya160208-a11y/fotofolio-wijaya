/**
 * Real user-supplied asset registry (PRD §52).
 * All section images resolve through this registry so assets can be
 * swapped without touching layout code. Values below must match files
 * that actually exist in /public/assets.
 */
export const assets = {
  /** Full-body hero cutout (transparent WebP), 717×1280. */
  hero: "/assets/wijaya-hero.webp",
  heroWidth: 717,
  heroHeight: 1280,
  /** Head/shoulders portrait cutout (transparent WebP), 717×694. */
  portrait: "/assets/wijaya-portrait.webp",
  portraitWidth: 717,
  portraitHeight: 694,
  projects: [
    "/assets/project-01.webp",
    "/assets/project-02.webp",
    "/assets/project-03.webp",
    "/assets/project-04.webp",
  ],
  caseStudy: "/assets/case-study.webp",
  certificates: [
    "/assets/certificate-01.webp",
    "/assets/certificate-02.webp",
    "/assets/certificate-03.webp",
    "/assets/certificate-04.webp",
  ],
  gallery: [
    "/assets/gallery-01.webp",
    "/assets/gallery-02.webp",
    "/assets/gallery-03.webp",
    "/assets/gallery-04.webp",
    "/assets/gallery-05.webp",
    "/assets/gallery-06.webp",
  ],
} as const;

export type AssetRegistry = typeof assets;
