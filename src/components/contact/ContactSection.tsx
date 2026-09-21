import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import { contact, contactLinks } from "../../data/contact";
import { profile } from "../../data/profile";
import { PortfolioSection } from "../shared/PortfolioSection";
import { Reveal } from "../shared/Reveal";
import { HudLine, MicroLabel, TechnicalCorner } from "../shared/decorations";

function Terminal() {
  const reduce = useReducedMotion();
  const full = contact.terminalPrompt;
  const [typed, setTyped] = useState(reduce ? full : "");

  useEffect(() => {
    if (reduce) return;
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setTyped(full.slice(0, i));
      if (i >= full.length) clearInterval(id);
    }, 75);
    return () => clearInterval(id);
  }, [full, reduce]);

  return (
    <div className="relative overflow-hidden rounded-[14px] border border-white/12 bg-black/55 p-4 font-mono shadow-[inset_0_1px_0_rgba(255,255,255,.06)]">
      <TechnicalCorner variant="top-right" size={11} />
      <div className="mb-2.5 flex items-center gap-1.5">
        <span className="h-2 w-2 rounded-full bg-burgundy" />
        <span className="h-2 w-2 rounded-full bg-gold/80" />
        <span className="h-2 w-2 rounded-full bg-paper/30" />
        <span className="ml-2 text-[9px] tracking-[0.18em] text-paper/40">TERMINAL</span>
      </div>
      <p className="text-[12px] leading-relaxed text-paper/90">
        <span className="text-gold">{typed}</span>
        <span
          className="ml-0.5 inline-block h-3.5 w-[7px] translate-y-0.5 bg-gold"
          style={{ animation: "blink 1s steps(1) infinite" }}
          aria-hidden="true"
        />
      </p>
      <p className="mt-2 text-[10.5px] leading-relaxed text-paper/45">
        STATUS: {contact.availability}
      </p>
    </div>
  );
}

export function ContactSection() {
  const reduce = useReducedMotion();
  return (
    <PortfolioSection
      id="contact"
      index={12}
      label="CONTACT"
      theme="panel"
      className="flex items-center py-[var(--section-pad)]"
      minHeight="100vh"
    >
      <div className="relative z-10 grid w-full grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Reveal>
            <MicroLabel>LET'S COLLABORATE</MicroLabel>
            <h2 className="mt-4 font-display text-[clamp(44px,7vw,104px)] uppercase leading-[0.86] text-paper">
              {contact.headline.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
            <p className="mt-6 max-w-[420px] text-[13.5px] leading-relaxed text-paper/65">
              {contact.subheading}
            </p>
            <HudLine className="my-8 max-w-[200px]" />
            <div className="flex flex-wrap gap-3">
              <a
                href={`mailto:${contact.email}`}
                className="group inline-flex items-center gap-2.5 rounded-[10px] bg-paper px-5 py-3 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-panel transition-transform duration-200 hover:-translate-y-0.5"
              >
                {contact.cta}
                <ArrowRight size={14} strokeWidth={2} className="transition-transform duration-200 group-hover:translate-x-1" />
              </a>
              <a
                href="#projects"
                className="inline-flex items-center gap-2.5 rounded-[10px] border border-paper/25 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.14em] text-paper/85 transition-colors duration-200 hover:border-paper/60"
              >
                {contact.ctaSecondary}
              </a>
            </div>
          </Reveal>
        </div>

        <div className="flex flex-col gap-6 lg:col-span-5">
          <Reveal variant="slide" direction="right" delay={0.15}>
            <Terminal />
          </Reveal>
          <Reveal
            variant="slide"
            direction="right"
            delay={0.25}
            className="overflow-hidden rounded-[14px] border border-white/10 bg-panel/70"
          >
            <ul>
              {contactLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target={l.href.startsWith("http") ? "_blank" : undefined}
                    rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="group flex items-center justify-between gap-3 border-b border-white/8 px-4 py-3 transition-colors duration-200 last:border-0 hover:bg-white/[0.05]"
                  >
                    <span className="flex items-center gap-2.5">
                      {l.label === "EMAIL" ? (
                        <Mail size={13} className="text-gold" />
                      ) : (
                        <span className="h-1.5 w-1.5 rounded-full bg-gold/70" />
                      )}
                      <span className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-paper/50">
                        {l.label}
                      </span>
                    </span>
                    <span className="font-mono text-[11px] text-paper/85 transition-colors group-hover:text-gold">
                      {l.value}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
          <motion.p
            className="font-hand text-2xl text-gold/90"
            initial={reduce ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {profile.username} — {profile.based}
          </motion.p>
        </div>
      </div>
    </PortfolioSection>
  );
}
