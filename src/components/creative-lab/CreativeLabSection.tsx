import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { gallery } from "../../data/gallery";
import { PortfolioSection } from "../shared/PortfolioSection";
import { Reveal } from "../shared/Reveal";
import { Parallax } from "../shared/Parallax";
import { X } from "lucide-react";
import { HudLine, MicroLabel, TechnicalCorner } from "../shared/decorations";

const spanClass: Record<string, string> = {
  tall: "row-span-2 sm:col-span-2",
  wide: "sm:col-span-2",
  square: "sm:col-span-1",
  std: "sm:col-span-1",
};
const parallaxAmount: Record<string, number> = { tall: 34, wide: 22, square: 14, std: 26 };

function GalleryLightbox({
  item,
  onClose,
}: {
  item: (typeof gallery)[number] | null;
  onClose: () => void;
}) {
  const reduce = useReducedMotion();
  return (
    <AnimatePresence>
      {item && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-dark/75 p-5 backdrop-blur-sm"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduce ? undefined : { opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`Pratinjau ${item.title}`}
        >
          <motion.figure
            className="relative w-full max-w-[720px] overflow-hidden rounded-[16px] border border-line bg-paper shadow-2xl"
            initial={reduce ? false : { scale: 0.95, y: 16 }}
            animate={{ scale: 1, y: 0 }}
            exit={reduce ? undefined : { scale: 0.96, y: 10 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Tutup pratinjau"
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-line bg-paper/90 text-ink"
            >
              <X size={15} />
            </button>
            <img
              src={item.image}
              alt={item.caption}
              className="h-auto max-h-[70vh] w-full object-cover grayscale"
            />
            <figcaption className="flex items-center justify-between gap-4 p-4">
              <div>
                <h3 className="font-display text-lg uppercase leading-none text-ink">
                  {item.title}
                </h3>
                <MicroLabel className="mt-1.5">{item.caption}</MicroLabel>
              </div>
              <MicroLabel>{item.type}</MicroLabel>
            </figcaption>
          </motion.figure>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function CreativeLabSection() {
  const [active, setActive] = useState<(typeof gallery)[number] | null>(null);

  return (
    <PortfolioSection
      id="creative-lab"
      index={10}
      label="CREATIVE LAB"
      theme="light"
      className="flex items-center py-[var(--section-pad)]"
      minHeight="120vh"
    >
      <div className="relative z-10 w-full">
        <Reveal className="mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <MicroLabel>HOW I EXPLORE IDEAS</MicroLabel>
            <h2 className="mt-3 font-display text-4xl uppercase leading-none text-ink md:text-5xl">
              VISUAL LAB
            </h2>
          </div>
          <p className="max-w-[300px] font-mono text-[10.5px] leading-relaxed text-muted">
            Kumpulan referensi & eksperimen visual. Klik gambar untuk pratinjau.
          </p>
        </Reveal>
        <HudLine className="mb-8" width="100%" />
        <div className="grid auto-rows-[150px] grid-cols-2 gap-4 sm:grid-cols-4">
          {gallery.map((item, i) => (
            <Reveal
              key={item.id}
              variant="scale"
              delay={i * 0.06}
              className={spanClass[item.span]}
            >
              <Parallax amount={parallaxAmount[item.span]} className="h-full">
                <button
                  type="button"
                  onClick={() => setActive(item)}
                  aria-label={`Buka ${item.title}`}
                  className="group relative block h-full w-full overflow-hidden rounded-[14px] border border-line bg-paper shadow-[0_10px_26px_rgba(23,35,45,.12)]"
                >
                  <img
                    src={item.image}
                    alt={item.caption}
                    width={400}
                    height={300}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover grayscale transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-panel/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <TechnicalCorner variant="top-left" size={11} />
                  <span className="absolute right-3 top-3 font-mono text-[9px] tracking-[0.18em] text-paper drop-shadow">
                    {item.specimen}
                  </span>
                  <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span className="block font-display text-sm uppercase leading-none text-paper">
                      {item.title}
                    </span>
                    <MicroLabel className="mt-1 text-paper/70">{item.type}</MicroLabel>
                  </div>
                </button>
              </Parallax>
            </Reveal>
          ))}
        </div>
      </div>
      <GalleryLightbox item={active} onClose={() => setActive(null)} />
    </PortfolioSection>
  );
}
