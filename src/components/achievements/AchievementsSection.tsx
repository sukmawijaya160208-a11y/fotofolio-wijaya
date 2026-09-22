import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Reveal } from "../shared/Reveal";
import { ScrollVideo } from "../shared/ScrollVideo";
import { MicroLabel, SectionIndex } from "../shared/decorations";

/**
 * Section 09 — HIGHLIGHT. Mode pinned: kontainer tinggi (280vh) + viewport
 * sticky. Scroll menghabiskan video dulu (0 → durasi penuh) baru section
 * berikutnya bisa masuk. Progress bar = progres video aktual.
 *
 * NOTE: section ini TIDAK pakai PortfolioSection — overflow-hidden di sana
 * mematikan position:sticky (menjadi scrollport sendiri).
 */
const TALL = "h-[280vh]";

export function AchievementsSection() {
  const reduce = useReducedMotion();
  const tallRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: tallRef,
    offset: ["start start", "end end"],
  });
  const bar = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      id="achievements"
      className="relative w-full bg-dark text-paper"
      aria-labelledby="achievements-title"
    >
      <div
        className="pointer-events-none absolute left-[clamp(20px,4vw,56px)] top-10 z-30 flex items-center gap-3"
        aria-hidden="true"
      >
        <SectionIndex index={9} />
        <span className="h-px w-8 bg-line" />
        <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted">
          HIGHLIGHT
        </span>
      </div>
      <h2 id="achievements-title" className="sr-only">
        Highlight video
      </h2>

      <div ref={tallRef} className={`relative ${TALL}`}>
        <div className="sticky top-0 flex h-[100svh] flex-col justify-end">
          <div className="absolute inset-0 overflow-hidden">
            <ScrollVideo
              src="/assets/highlight.mp4"
              srcMobile="/assets/highlight-m.mp4"
              poster="/assets/highlight-poster.webp"
              label="Video highlight"
              targetRef={tallRef}
              cinema
            />
            <div
              className="pointer-events-none absolute inset-0"
              aria-hidden="true"
              style={{
                background:
                  "linear-gradient(180deg, rgba(3,5,7,.55) 0%, transparent 30%, transparent 62%, rgba(3,5,7,.72) 100%)",
              }}
            />
          </div>
          <div className="relative z-10 w-full px-6 pb-14 md:px-10 lg:px-[clamp(40px,6vw,96px)]">
            <Reveal>
              <MicroLabel className="text-paper/60">09 / HIGHLIGHT</MicroLabel>
              <h3 className="mt-3 font-display text-[clamp(40px,7vw,96px)] uppercase leading-[0.85] text-paper">
                MOMEN
              </h3>
              <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-paper/50">
                SCROLL SAMPAI HABIS — VIDEO MENGIKUTI GERAKANMU
              </p>
            </Reveal>
            <div className="mt-6 h-[3px] w-full overflow-hidden rounded bg-white/10" aria-hidden="true">
              {reduce ? (
                <span className="block h-full w-full bg-gold/70" />
              ) : (
                <motion.span className="block h-full origin-left bg-gold" style={{ scaleX: bar }} />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
