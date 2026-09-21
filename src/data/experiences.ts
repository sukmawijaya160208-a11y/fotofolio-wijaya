export type Experience = {
  id: string;
  role: string;
  organization: string;
  period: string;
  description: string;
  tags: string[];
  status: string;
  image?: string;
};

// TODO: replace with real experience entries — these are editable placeholders.
export const experiences: Experience[] = [
  {
    id: "exp-01",
    role: "ROLE",
    organization: "PROJECT / ORGANIZATION",
    period: "20XX — 20XX",
    description:
      "Deskripsi pengalaman belum diisi. Ganti entri ini di src/data/experiences.ts dengan pengalaman nyata.",
    tags: ["Tools", "Stack"],
    status: "PLACEHOLDER",
  },
  {
    id: "exp-02",
    role: "ROLE",
    organization: "PROJECT / ORGANIZATION",
    period: "20XX — 20XX",
    description:
      "Deskripsi pengalaman belum diisi. Ganti entri ini di src/data/experiences.ts dengan pengalaman nyata.",
    tags: ["Tools", "Stack"],
    status: "PLACEHOLDER",
  },
  {
    id: "exp-03",
    role: "ROLE",
    organization: "PROJECT / ORGANIZATION",
    period: "20XX — 20XX",
    description:
      "Deskripsi pengalaman belum diisi. Ganti entri ini di src/data/experiences.ts dengan pengalaman nyata.",
    tags: ["Tools", "Stack"],
    status: "PLACEHOLDER",
  },
];
