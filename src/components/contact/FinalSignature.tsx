import { motion, useReducedMotion } from "framer-motion";
import { finalSignature } from "../../data/manifesto";
import { profile } from "../../data/profile";
import { contactLinks } from "../../data/contact";
import { BarcodeSignature } from "../hero/BarcodeSignature";
import { HudLine, MicroLabel, ScanLine } from "../shared/decorations";
import { Reveal } from "../shared/Reveal";

function Monogram() {
  const reduce = useReducedMotion();
  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { duration: 1.4, ease: [0.22, 1, 0.36, 1] as const },
    },
  };
  return (
    <svg
      width="118"
      height="72"
      viewBox="0 0 118 72"
      fill="none"
      className="overflow-visible"
      aria-hidden="true"
    >
      <motion.circle
        cx="59"
        cy="36"
        r="32"
        stroke="rgba(211,165,45,.35)"
        strokeWidth="1"
        variants={draw}
        initial={reduce ? false : "hidden"}
        animate="visible"
      />
      <motion.path
        d="M36 54 L44 18 L59 42 L74 18 L82 54"
        stroke="#d3a52d"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={draw}
        initial={reduce ? false : "hidden"}
        animate="visible"
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
      />
    </svg>
  );
}

export function FinalSignature() {
  const reduce = useReducedMotion();
  return (
    <footer
      id="final"
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-dark px-6 py-20 text-center md:px-10"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(rgba(248,250,251,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(248,250,251,.04) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
      {reduce ? null : (
        <ScanLine className="opacity-40" delay={1.2} />
      )}

      <div className="relative z-10 flex w-full max-w-[760px] flex-col items-center gap-8">
        <Reveal variant="fade">
          <Monogram />
          <MicroLabel className="mt-6 block text-paper/45">
            13 / SIGNATURE
          </MicroLabel>
        </Reveal>

        <Reveal variant="fade" delay={0.2}>
          <h2 className="font-display text-[clamp(52px,10vw,132px)] uppercase leading-[0.82] title-emboss-dark">
            Thank You.
          </h2>
          <p className="mt-3 font-display text-[clamp(26px,4.5vw,56px)] uppercase leading-[0.85] text-paper/25">
            Keep Building.
          </p>
        </Reveal>

        <HudLine className="max-w-[420px]" width="100%" />

        <Reveal variant="fade" delay={0.3} className="flex flex-col items-center gap-2">
          <span className="font-mono text-[11px] uppercase tracking-[0.26em] text-paper/75">
            {finalSignature.name}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-paper/45">
            CREATIVE DEVELOPER
          </span>
        </Reveal>

        <Reveal variant="fade" delay={0.4} className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          {contactLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.href.startsWith("http") ? "_blank" : undefined}
              rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="font-mono text-[10px] uppercase tracking-[0.16em] text-paper/55 transition-colors duration-200 hover:text-gold"
            >
              {l.label}
            </a>
          ))}
        </Reveal>

        <Reveal variant="fade" delay={0.5}>
          <p className="font-hand text-3xl text-burgundy/90 md:text-4xl">
            {finalSignature.closing}
          </p>
        </Reveal>

        <Reveal variant="fade" delay={0.6} className="mt-4 flex w-full flex-col items-center gap-6">
          <div className="flex w-full flex-col items-center justify-between gap-6 border-t border-white/10 pt-6 md:flex-row">
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
              <MicroLabel className="text-paper/40">{finalSignature.copyright}</MicroLabel>
              <MicroLabel className="text-paper/40">BUILT WITH REACT</MicroLabel>
              <MicroLabel className="text-paper/40">{profile.version}</MicroLabel>
            </div>
            <div className="flex items-center gap-4">
              <MicroLabel className="text-paper/40">13 / END OF TRANSMISSION</MicroLabel>
              <BarcodeSignature dark />
            </div>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}
