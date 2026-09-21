export type CaseStudy = {
  id: string;
  index: string;
  title: string;
  category: string;
  image: string;
  role: string;
  tools: string[];
  duration: string;
  challenge: string;
  solution: string;
  process: string[];
  result: string;
  metrics: { value: string; label: string }[];
};

// TODO: replace with a real case study — this is an editable placeholder.
export const caseStudy: CaseStudy = {
  id: "case-01",
  index: "01",
  title: "PROJECT NAME",
  category: "CASE STUDY",
  image: "/assets/case-study.webp",
  role: "ROLE",
  tools: ["Tool", "Tool", "Tool"],
  duration: "XX MINGGU",
  challenge:
    "Tantangan belum diisi. Jelaskan masalah yang diselesaikan pada proyek ini di src/data/caseStudies.ts.",
  solution:
    "Solusi belum diisi. Jelaskan pendekatan dan keputusan teknis yang diambil.",
  process: ["LANGKAH 01", "LANGKAH 02", "LANGKAH 03"],
  result:
    "Hasil belum diisi. Jelaskan outcome dan dampak dari solusi yang dibangun.",
  metrics: [
    { value: "XX", label: "METRIC" },
    { value: "XX", label: "METRIC" },
    { value: "XX", label: "METRIC" },
  ],
};
