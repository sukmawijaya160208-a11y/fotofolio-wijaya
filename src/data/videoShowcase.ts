/**
 * Section 07-A — VIDEO SHOWCASE (elastic accordion, YouTube).
 * Thumbnails: i.ytimg.com (real, dari YouTube). Player: youtube-nocookie,
 * dimuat hanya setelah diklik (no auto-embed cost). Judul asli menyusul
 * dari owner — label netral, bukan klaim.
 */
export type ShowcaseVideo = {
  id: string;
  videoId: string;
  title: string;
  category: string;
};

const thumb = (videoId: string) => `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
export const embedUrl = (videoId: string) =>
  `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`;

export const showcaseVideos: ShowcaseVideo[] = [
  { id: "01", videoId: "HOAzgL6VNvY", title: "VIDEO 01", category: "SHOWCASE" },
  { id: "02", videoId: "E38yeZhzt10", title: "VIDEO 02", category: "SHOWCASE" },
  { id: "03", videoId: "cJVTh89zjvU", title: "VIDEO 03", category: "SHOWCASE" },
  { id: "04", videoId: "45iuHFVsVLA", title: "VIDEO 04", category: "SHOWCASE" },
  { id: "05", videoId: "f7S-27ENEzg", title: "VIDEO 05", category: "SHOWCASE" },
];

export const videoThumb = thumb;
