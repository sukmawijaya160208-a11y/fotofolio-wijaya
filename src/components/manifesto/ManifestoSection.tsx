import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { manifesto, manifestoIntro } from "../../data/manifesto";
import { CodeUniverse } from "../universe/CodeUniverse";
import { MicroLabel } from "../shared/decorations";

function ManifestoWord({
  phrase,
  index,
  total,
  progress,
  reduce,
}: {
  phrase: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
  reduce: boolean | null;
}) {
  const step = 1 / total;
  const start = index * step;
  const mid = start + step * 0.5;
  const end = start + step;
  const isLast = index === total - 1;

  const opacity = useTransform(progress, [start, mid, end], isLast ? [0, 1, 1] : [0, 1, 0]);
  const y = useTransform(progress, [start, mid], reduce ? [0, 0] : [60, 0]);

  return (
    <motion.h2
      className="absolute inset-0 flex items-center justify-center px-4 text-center font-display uppercase leading-[0.9] text-paper"
      style={reduce ? { opacity: 1, y: 0 } : { opacity, y }}
    >
      {phrase}
    </motion.h2>
  );
}

function ManifestoSequence() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={ref} className="relative h-[240vh] md:h-[300vh]">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden px-6">
        <MicroLabel className="mb-10 text-burgundy/80">{manifestoIntro}</MicroLabel>
        <div className="relative h-[32vh] w-full md:h-[40vh]">
          {manifesto.map((phrase, i) => (
            <ManifestoWord
              key={phrase}
              phrase={phrase}
              index={i}
              total={manifesto.length}
              progress={scrollYProgress}
              reduce={reduce}
            />
          ))}
        </div>
        <div className="mt-12 h-px w-40 overflow-hidden bg-paper/15">
          {reduce ? (
            <span className="block h-full w-full bg-gold" />
          ) : (
            <motion.span
              className="block h-full origin-left bg-gold"
              style={{ scaleX: scrollYProgress }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export function ManifestoSection() {
  return (
    <section
      id="manifesto"
      className="relative w-full overflow-hidden bg-dark text-paper"
      aria-labelledby="manifesto-title"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(rgba(248,250,251,.045) 1px, transparent 1px), linear-gradient(90deg, rgba(248,250,251,.045) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[60vh] w-[60vh] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(127,13,34,.28), transparent 68%)" }}
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute left-6 top-20 font-mono text-[10px] tracking-[0.2em] text-paper/35 md:left-10">
        11 / CODE UNIVERSE
      </div>
      <h2 id="manifesto-title" className="sr-only">
        Manifesto pribadi
      </h2>
      <ManifestoSequence />
      <CodeUniverse />
    </section>
  );
}
