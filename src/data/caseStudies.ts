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

// Featured case — WEBSITE ANIME (foto + judul asli dari owner).
// Narasi ditulis sejalan dengan data proyek yang ada; tanpa klaim klien/metrik.
export const caseStudy: CaseStudy = {
  id: "case-01",
  index: "01",
  title: "WEBSITE ANIME",
  category: "CASE STUDY",
  image: "/assets/case-study.webp",
  role: "FRONTEND DEVELOPER",
  tools: ["React", "TypeScript"],
  duration: "—",
  challenge:
    "Penggemar anime butuh direktori yang cepat dibuka dan gampang dijelajah — bukan halaman berat dengan navigasi berantakan yang bikin pengunjung kabur sebelum menemukan tontonan.",
  solution:
    "Single-page experience berbasis React + TypeScript: komponen tertata rapi, data terpusat, dan layout mobile-first supaya katalog tetap ringan dibuka dari HP maupun laptop.",
  process: [
    "Riset konten & susun struktur katalog",
    "Bangun antarmuka berbasis komponen",
    "Uji coba lintas perangkat & rapikan",
  ],
  result:
    "Katalog anime yang cepat, rapi, dan nyaman dijelajah — fondasi yang mudah dikembangkan ke fitur lanjutan seperti pencarian dan filter.",
  metrics: [
    { value: "2026", label: "YEAR" },
    { value: "01", label: "FEATURED CASE" },
    { value: "ID", label: "REGION" },
  ],
};
