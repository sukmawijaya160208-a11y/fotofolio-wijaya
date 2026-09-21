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
  degree: "INFORMATICS ENGINEERING",
  school: "UNIVERSITAS PGRI SILAMPARI",
  period: "TEKNIK INFORMATIKA",
  status: "ONGOING",
  subjects: ["Algoritma", "Basis Data", "Pemrograman", "Rekayasa Perangkat Lunak", "Jaringan", "UI / UX"],
};

// TODO: replace with real certificates — these are editable placeholders.
export const certificates: Certificate[] = [
  {
    id: "cert-01",
    title: "CERTIFICATE TITLE",
    issuer: "ISSUER",
    date: "20XX",
    image: "/assets/certificate-01.webp",
    featured: true,
  },
  {
    id: "cert-02",
    title: "CERTIFICATE TITLE",
    issuer: "ISSUER",
    date: "20XX",
    image: "/assets/certificate-02.webp",
  },
  {
    id: "cert-03",
    title: "CERTIFICATE TITLE",
    issuer: "ISSUER",
    date: "20XX",
    image: "/assets/certificate-03.webp",
  },
  {
    id: "cert-04",
    title: "CERTIFICATE TITLE",
    issuer: "ISSUER",
    date: "20XX",
    image: "/assets/certificate-04.webp",
  },
];
