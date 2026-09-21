export type GalleryItem = {
  id: string;
  specimen: string;
  title: string;
  type: string;
  image: string;
  caption: string;
  span: "tall" | "wide" | "square" | "std";
};

// TODO: replace with real creative work — these are editable placeholders.
export const gallery: GalleryItem[] = [
  { id: "g-01", specimen: "01", title: "SPECIMEN 01", type: "PHOTOGRAPHY", image: "/assets/gallery-01.webp", caption: "Referensi visual 01", span: "tall" },
  { id: "g-02", specimen: "02", title: "SPECIMEN 02", type: "UI SCREENSHOT", image: "/assets/gallery-02.webp", caption: "Referensi visual 02", span: "std" },
  { id: "g-03", specimen: "03", title: "SPECIMEN 03", type: "EXPERIMENT", image: "/assets/gallery-03.webp", caption: "Referensi visual 03", span: "wide" },
  { id: "g-04", specimen: "04", title: "SPECIMEN 04", type: "SKETCH", image: "/assets/gallery-04.webp", caption: "Referensi visual 04", span: "std" },
  { id: "g-05", specimen: "05", title: "SPECIMEN 05", type: "GRAPHIC", image: "/assets/gallery-05.webp", caption: "Referensi visual 05", span: "square" },
  { id: "g-06", specimen: "06", title: "SPECIMEN 06", type: "ARCHITECTURE", image: "/assets/gallery-06.webp", caption: "Referensi visual 06", span: "std" },
];
