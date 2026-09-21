import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { universeMeta, universeNodes, type UniverseNode } from "../../data/universe";
import { useInView } from "../../lib/useInView";
import { MicroLabel } from "../shared/decorations";

const UniverseCanvas = lazy(() =>
  import("./UniverseScene").then((m) => ({ default: m.UniverseCanvas })),
);

export function CodeUniverse() {
  const reduce = useReducedMotion();
  const [selected, setSelected] = useState<UniverseNode | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const progress = useRef(0);
  const { ref: inViewRef, inView } = useInView<HTMLDivElement>({
    threshold: 0.05,
    rootMargin: "300px 0px",
  });
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => {
      progress.current = v;
    });
    return unsub;
  }, [scrollYProgress]);

  const titleOpacity = useTransform(scrollYProgress, [0.82, 0.94], [0, 1]);
  const titleScale = useTransform(scrollYProgress, [0.82, 1], [1.06, 1]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.12, 0.2], [0, 1, 0]);
  const quality: "low" | "high" =
    typeof window !== "undefined" && window.innerWidth < 768 ? "low" : "high";

  return (
    <div ref={scrollRef} className="relative h-[340vh]">
      <div
        ref={inViewRef}
        className="sticky top-0 h-screen overflow-hidden bg-dark"
      >
        {inView && (
          <Suspense fallback={null}>
            <UniverseCanvas
              progress={progress}
              reduce={!!reduce}
              quality={quality}
              selected={selected}
              onSelect={setSelected}
            />
          </Suspense>
        )}

        {/* Blueprint HUD (PRD §17) — mono, low opacity */}
        <div className="pointer-events-none absolute left-6 top-16 flex flex-col gap-1.5 md:left-10">
          <MicroLabel className="text-gold/70">ORBITAL SYSTEM / 11</MicroLabel>
          <MicroLabel className="text-paper/35">SYSTEM — {universeMeta.system}</MicroLabel>
        </div>
        <div className="pointer-events-none absolute right-6 top-16 flex flex-col items-end gap-1.5 md:right-10">
          <MicroLabel className="text-paper/35">
            CORE STATUS — {universeMeta.status}
          </MicroLabel>
          <MicroLabel className="text-paper/35">NODES — {universeMeta.nodes}</MicroLabel>
        </div>

        <motion.div
          style={{ opacity: hintOpacity }}
          className="pointer-events-none absolute inset-x-0 bottom-[14vh] flex justify-center"
        >
          <MicroLabel className="text-paper/40">SCROLL TO EXPLORE ↓</MicroLabel>
        </motion.div>

        <motion.div
          style={reduce ? { opacity: 1 } : { opacity: titleOpacity, scale: titleScale }}
          className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center"
        >
          <MicroLabel className="text-gold/80">{universeMeta.intro}</MicroLabel>
          <h3 className="mt-4 font-display text-[clamp(48px,10vw,150px)] uppercase leading-[0.82] title-emboss-dark">
            Code Universe
          </h3>
        </motion.div>

        {/* Selection panel (PRD §19) */}
        {selected && (
          <div className="absolute bottom-10 left-6 z-40 w-[min(280px,82vw)] rounded-[14px] border border-white/12 bg-black/70 p-4 backdrop-blur-md md:left-10">
            <div className="mb-3 flex items-start justify-between gap-3">
              <div>
                <span className="block font-display text-2xl uppercase leading-none text-paper">
                  {selected.name}
                </span>
                <MicroLabel className="mt-1.5 text-gold/70">
                  {selected.category}
                </MicroLabel>
              </div>
              <button
                type="button"
                onClick={() => setSelected(null)}
                aria-label="Tutup panel"
                className="font-mono text-[10px] text-paper/45 transition-colors hover:text-paper"
              >
                ESC ✕
              </button>
            </div>
            <dl className="grid grid-cols-3 gap-2 border-y border-white/10 py-3">
              {[
                ["TYPE", selected.type],
                ["ORBIT", String(selected.orbit).padStart(2, "0")],
                ["STATUS", universeMeta.status],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="font-mono text-[8px] uppercase tracking-[0.18em] text-paper/40">
                    {k}
                  </dt>
                  <dd className="mt-0.5 font-mono text-[9.5px] uppercase tracking-[0.1em] text-paper/85">
                    {v}
                  </dd>
                </div>
              ))}
            </dl>
            {selected.description && (
              <p className="mt-3 text-[12px] leading-relaxed text-paper/65">
                {selected.description}
              </p>
            )}
          </div>
        )}

        {/* Semantic fallback (PRD §38) */}
        <ul className="sr-only">
          {universeNodes.map((n) => (
            <li key={n.id}>
              {n.name} — {n.category}, {n.type}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
