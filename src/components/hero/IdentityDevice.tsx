import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "../shared/Reveal";
import { TechnicalCorner } from "../shared/decorations";
import { profile } from "../../data/profile";

function MiniBarcode() {
  const widths = [2, 1, 3, 1, 2, 1, 1, 3, 2, 1, 2, 2, 1, 3, 1];
  return (
    <div className="flex items-end gap-[1.5px]" aria-hidden="true">
      {widths.map((w, i) => (
        <span
          key={i}
          className="block bg-paper/80"
          style={{ width: w, height: i % 4 === 0 ? 15 : 11 }}
        />
      ))}
    </div>
  );
}

export function IdentityDevice() {
  const reduce = useReducedMotion();
  return (
    <Reveal
      variant="scale"
      delay={0.6}
      duration={0.85}
      className="relative h-[288px] w-[318px] rounded-[30px] bg-panel p-3 shadow-[0_22px_50px_rgba(23,35,45,.34)]"
    >
      <TechnicalCorner variant="top-left" size={12} />
      <TechnicalCorner variant="bottom-right" size={12} />
      <div className="absolute inset-x-0 top-3 flex items-center justify-between px-5">
        <span className="h-1.5 w-12 rounded-full bg-paper/25" />
        <span className="font-mono text-[8px] tracking-[0.18em] text-paper/45">
          ID-DEVICE
        </span>
        <span className="h-1.5 w-1.5 rounded-full bg-gold" />
      </div>
      <div className="relative mt-6 h-[178px] overflow-hidden rounded-[20px] border border-paper/15">
        <img
          src={profile.portraitImage}
          alt="Potret monochrome Muhammad Sukma Wijaya pada perangkat identitas"
          width={294}
          height={178}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover grayscale contrast-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-panel via-panel/10 to-transparent" />
        <motion.span
          aria-hidden="true"
          className="absolute inset-x-3 h-px bg-gold/70"
          style={{ top: "50%" }}
          animate={reduce ? undefined : { top: ["16%", "80%", "16%"] }}
          transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
        />
        <span className="absolute bottom-2 left-3 font-mono text-[8px] tracking-[0.18em] text-paper/55">
          SCAN COMPLETE
        </span>
      </div>
      <div className="mt-3.5 flex items-end justify-between px-1.5">
        <div>
          <p className="font-display text-xl uppercase leading-none text-paper">
            {profile.displayName}
          </p>
          <p className="mt-1 font-mono text-[8px] uppercase tracking-[0.16em] text-paper/45">
            VERIFIED IDENTITY
          </p>
        </div>
        <MiniBarcode />
      </div>
    </Reveal>
  );
}
