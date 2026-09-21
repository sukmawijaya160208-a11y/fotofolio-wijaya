export type Achievement = {
  value: string;
  suffix?: string;
  label: string;
  note: string;
};

export const achievements: Achievement[] = [
  { value: "125", suffix: "+", label: "POSTS", note: "Konten yang dipublikasikan" },
  { value: "88.8", suffix: "K", label: "AUDIENCE", note: "Jangkauan audiens" },
  { value: "01", suffix: "", label: "DEGREE", note: "Informatics Engineering" },
  { value: "XX", suffix: "", label: "PROJECTS", note: "Proyek sejauh ini" },
  { value: "XX", suffix: "", label: "CERTIFICATES", note: "Sertifikat sejauh ini" },
];

export type MiniAchievement = {
  title: string;
  year: string;
  note: string;
};

// TODO: replace with real awards/milestones — these are editable placeholders.
export const miniAchievements: MiniAchievement[] = [
  { title: "AWARD / MILESTONE", year: "20XX", note: "Deskripsi belum diisi." },
  { title: "AWARD / MILESTONE", year: "20XX", note: "Deskripsi belum diisi." },
  { title: "AWARD / MILESTONE", year: "20XX", note: "Deskripsi belum diisi." },
];
