export type Certificate = {
  id: string;
  title: string;
  issuer: string;
  date: string;
  image: string;
  credentialUrl?: string;
  featured?: boolean;
};

export type EducationEntry = {
  degree: string;
  school: string;
  period: string;
  status: string;
  subjects: string[];
};

export const education: EducationEntry = {
  degree: "SISTEM INFORMASI",
  school: "UNIVERSITAS BINA INSAN LUBUKLINGGAU",
  period: "SEMESTER 3",
  status: "AKTIF",
  subjects: ["Algoritma", "Basis Data", "Pemrograman", "Rekayasa Perangkat Lunak", "Jaringan", "UI / UX"],
};

// TODO: replace with real certificates — these are editable placeholders.
// Real user-supplied certificates (foto asli, judul dari nama file).
// Issuer/tahun menyusul dari owner — tidak dikarang.
export const certificates: Certificate[] = [
  {
    id: "cert-01",
    title: "PROMPT ENGINEER",
    issuer: "—",
    date: "—",
    image: "/assets/certificate-01.webp",
    featured: true,
  },
  {
    id: "cert-02",
    title: "AI PROMPT",
    issuer: "—",
    date: "—",
    image: "/assets/certificate-02.webp",
  },
  {
    id: "cert-03",
    title: "CYBER SECURITY",
    issuer: "—",
    date: "—",
    image: "/assets/certificate-03.webp",
  },
  {
    id: "cert-04",
    title: "UI UX DESIGNER",
    issuer: "—",
    date: "—",
    image: "/assets/certificate-04.webp",
  },
];
