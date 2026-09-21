export type Project = {
  id: string;
  title: string;
  year: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
  featured?: boolean;
  caseStudyId?: string;
};

// Real user-supplied projects (foto + judul asli dari owner).
// Deskripsi detail menyusul — tidak dikarang.
export const projects: Project[] = [
  {
    id: "project-01",
    title: "WEBSITE ANIME",
    year: "2026",
    category: "WEBSITE",
    description:
      "Website bertema anime. Detail proyek menyusul dari owner.",
    image: "/assets/project-01.webp",
    tags: ["React", "TypeScript"],
    featured: true,
    caseStudyId: "case-01",
  },
  {
    id: "project-02",
    title: "UI UX DESAIN",
    year: "2025",
    category: "UI / UX",
    description: "Desain antarmuka. Detail proyek menyusul dari owner.",
    image: "/assets/project-02.webp",
    tags: ["UI / UX"],
  },
  {
    id: "project-03",
    title: "WEBSITE ARSITEK GAME",
    year: "2025",
    category: "WEBSITE",
    description: "Website arsitek bertema game. Detail proyek menyusul dari owner.",
    image: "/assets/project-03.webp",
    tags: ["Web"],
  },
  {
    id: "project-04",
    title: "WEB LESTARI BUMI",
    year: "2024",
    category: "WEBSITE",
    description: "Website Lestari Bumi. Detail proyek menyusul dari owner.",
    image: "/assets/project-04.webp",
    tags: ["Web"],
  },
];
