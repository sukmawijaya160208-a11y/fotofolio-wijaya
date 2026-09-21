import { assets } from "./assets";

export const profile = {
  name: "Muhammad Sukma Wijaya",
  displayName: "WIJAYA",
  username: "@lamibalsukma",
  education: "Informatics Engineering",
  university: "Universitas PGRI Silampari",
  quote: "MENERIMA SEMUA NOTIF KECUALI HUTANG!",
  about:
    "Pemuda biasa dengan mimpi luar biasa. Fokus pada proses, percaya pada Tuhan, dan biarkan hasil berbicara.",
  role: "Creative Developer / Informatics Engineering",
  focus: ["Web Development", "UI / UX", "Creative Technology"],
  based: "Indonesia",
  version: "VER 2.4",
  stats: {
    posts: "125",
    followers: "88,8RB",
    following: "1,2JT",
  },
  social: {
    instagram: "lamibalsukma",
    facebook: "lamibalsukma",
    tiktok: "lamibalsukma",
    pinterest: "lamibalsukma",
    website: "www.lamibalsukma.com",
  },
  tags: ["DREAMER", "FOCUSED", "HARD WORK", "GRATEFUL"],
  heroImage: assets.hero,
  portraitImage: assets.portrait,
} as const;

export type Profile = typeof profile;
