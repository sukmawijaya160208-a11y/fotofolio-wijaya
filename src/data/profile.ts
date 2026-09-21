import { assets } from "./assets";

export const profile = {
  name: "Muhammad Sukma Wijaya",
  displayName: "WIJAYA",
  username: "@sukmawijaya1602",
  education: "Sistem Informasi — Semester 3",
  university: "Universitas Bina Insan Lubuklinggau",
  quote: "MENERIMA SEMUA NOTIF KECUALI HUTANG!",
  about:
    "Mahasiswa Sistem Informasi & Prompt Engineer. Menggabungkan logika koding dengan seni desain — mengubah ide rumit menjadi karya digital yang simpel dan berkualitas.",
  role: "Prompt Engineer / Sistem Informasi",
  focus: ["Coding", "Graphic Design", "Web Design"],
  based: "Lubuklinggau, Sumatera Selatan",
  version: "VER 2.4",
  stats: {
    posts: "125",
    followers: "88,8RB",
    following: "1,2JT",
  },
  social: {
    instagram: "sukmawijaya1602",
    facebook: "Sukma Wijaya",
    tiktok: "PRO'MT Sukma",
    pinterest: "Muhammad Sukma Wijaya",
    website: "muhammad-sukma-wijaya.vercel.app",
  },
  tags: ["DREAMER", "FOCUSED", "HARD WORK", "GRATEFUL"],
  heroImage: assets.hero,
  portraitImage: assets.portrait,
} as const;

export type Profile = typeof profile;
