import { finalSignature } from "../../data/manifesto";
import { profile } from "../../data/profile";
import { contactLinks } from "../../data/contact";
import { BarcodeSignature } from "../hero/BarcodeSignature";
import { HudLine, MicroLabel } from "../shared/decorations";
import { Reveal } from "../shared/Reveal";

export function FinalSignature() {
  return (
    <footer
      id="final"
      className="relative w-full overflow-hidden bg-dark px-6 py-20 text-paper md:px-10 lg:px-[clamp(40px,6vw,96px)]"
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
      <div className="relative z-10 flex flex-col items-center gap-10 text-center">
        <Reveal>
          <MicroLabel className="text-paper/45">13 / SIGNATURE</MicroLabel>
          <h2 className="mt-5 font-display text-[clamp(64px,12vw,170px)] uppercase leading-[0.82] title-emboss-dark">
            {finalSignature.display}
          </h2>
          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.26em] text-paper/65">
            {finalSignature.name}
          </p>
        </Reveal>

        <Reveal variant="fade" delay={0.15} className="flex flex-col items-center gap-3">
          {finalSignature.meta.map((m) => (
            <MicroLabel key={m} className="text-paper/55">
              {m}
            </MicroLabel>
          ))}
        </Reveal>

        <HudLine className="max-w-[420px]" width="100%" />

        <Reveal variant="fade" delay={0.25} className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
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

        <Reveal variant="fade" delay={0.35} className="flex w-full flex-col items-center gap-6">
          <p className="font-hand text-3xl text-burgundy/90 md:text-4xl">{finalSignature.closing}</p>
          <div className="flex w-full flex-col items-center justify-between gap-6 border-t border-white/10 pt-6 md:flex-row">
            <MicroLabel className="text-paper/40">{finalSignature.copyright}</MicroLabel>
            <div className="flex items-center gap-4">
              <MicroLabel className="text-paper/40">{profile.username}</MicroLabel>
              <BarcodeSignature dark />
            </div>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}
