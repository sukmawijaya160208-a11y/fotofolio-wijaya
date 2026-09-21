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

// TODO: replace with real projects — these are editable placeholders.
export const projects: Project[] = [
  {
    id: "project-01",
    title: "PROJECT NAME",
    year: "2026",
    category: "CATEGORY",
    description:
      "Deskripsi proyek belum diisi. Ganti entri ini di src/data/projects.ts dengan proyek nyata.",
    image: "/assets/project-01.webp",
    tags: ["React", "TypeScript"],
    featured: true,
    caseStudyId: "case-01",
  },
  {
    id: "project-02",
    title: "PROJECT NAME",
    year: "2025",
    category: "CATEGORY",
    description: "Deskripsi proyek belum diisi.",
    image: "/assets/project-02.webp",
    tags: ["UI / UX"],
  },
  {
    id: "project-03",
    title: "PROJECT NAME",
    year: "2025",
    category: "CATEGORY",
    description: "Deskripsi proyek belum diisi.",
    image: "/assets/project-03.webp",
    tags: ["Web"],
  },
  {
    id: "project-04",
    title: "PROJECT NAME",
    year: "2024",
    category: "CATEGORY",
    description: "Deskripsi proyek belum diisi.",
    image: "/assets/project-04.webp",
    tags: ["Web"],
  },
];
