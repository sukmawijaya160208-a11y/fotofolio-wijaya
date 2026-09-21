import { ArrowUpRight, Code2, MessageCircle, Palette, Globe } from "lucide-react";
import { contactLinks } from "../../data/contact";
import { profile } from "../../data/profile";
import { MicroLabel } from "../shared/decorations";

const services = [
  {
    icon: Code2,
    title: "CODING & PROGRAMMING",
    desc: "Bantuan pembuatan, perbaikan, dan pengembangan kode program.",
  },
  {
    icon: Palette,
    title: "GRAPHIC DESIGN",
    desc: "Desain visual, logo, poster, dan kebutuhan branding lainnya.",
  },
  {
    icon: Globe,
    title: "WEB DESIGN & DEVELOPMENT",
    desc: "Website modern dan responsif untuk personal, UMKM, dan bisnis.",
  },
];

/**
 * Section 07-B — glass services block.
 * Adaptasi glassmorphism prompt ke identitas proyek (dark + gold, tanpa
 * shadcn, tanpa player/playlist fake). Isi 100% data bio owner: layanan,
 * WhatsApp, sosmed.
 */
export function ServicesGlass() {
  const wa = contactLinks.find((l) => l.label === "WHATSAPP")!;
  const socials = contactLinks.filter((l) => l.label !== "WHATSAPP" && l.label !== "EMAIL");

  return (
    <div className="relative overflow-hidden rounded-[22px] border border-white/12 bg-white/[0.04] p-6 shadow-[0_40px_120px_rgba(0,0,0,.45)] backdrop-blur-2xl md:p-12">
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-[380px] w-[380px] rounded-full bg-burgundy/25 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-28 -left-20 h-[320px] w-[320px] rounded-full bg-gold/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative z-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <MicroLabel className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-paper/70">
            WHAT I DO
          </MicroLabel>
          <h3 className="mt-5 font-display text-4xl uppercase leading-[0.9] text-paper md:text-5xl">
            IDE RUMIT JADI KARYA DIGITAL
          </h3>
          <p className="mt-4 max-w-[420px] text-[13px] leading-relaxed text-paper/60">
            {profile.about}
          </p>

          <div className="mt-6 flex flex-col gap-3">
            {services.map((s) => (
              <div
                key={s.title}
                className="group flex items-start gap-4 rounded-[16px] border border-white/10 bg-black/30 p-4 backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/40"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-gold">
                  <s.icon size={16} strokeWidth={2} />
                </span>
                <span>
                  <span className="block font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-paper">
                    {s.title}
                  </span>
                  <span className="mt-1 block text-[12px] leading-relaxed text-paper/55">
                    {s.desc}
                  </span>
                </span>
              </div>
            ))}
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href={wa.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 rounded-[12px] bg-gold px-5 py-3 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-panel transition-transform duration-200 hover:-translate-y-0.5"
            >
              <MessageCircle size={14} strokeWidth={2} />
              CHAT {wa.value}
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-[12px] border border-white/25 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.14em] text-paper/85 transition-colors duration-200 hover:border-gold/70 hover:text-gold"
            >
              SEMUA KONTAK <ArrowUpRight size={14} strokeWidth={2} />
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="rounded-[18px] border border-white/10 bg-black/40 p-5 backdrop-blur-xl">
            <MicroLabel className="text-paper/45">STATUS</MicroLabel>
            <p className="mt-2 font-display text-2xl uppercase leading-none text-paper">
              {profile.username}
            </p>
            <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-gold/80">
              {profile.role}
            </p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-paper/45">
              {profile.education} · {profile.university}
            </p>
          </div>

          <ul className="flex flex-col gap-px overflow-hidden rounded-[18px] border border-white/10 bg-black/40 backdrop-blur-xl">
            {socials.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  target={l.href.startsWith("http") ? "_blank" : undefined}
                  rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group flex items-center justify-between gap-3 border-b border-white/8 px-5 py-3.5 transition-colors duration-200 last:border-0 hover:bg-white/[0.05]"
                >
                  <span className="flex items-center gap-2.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold/70" />
                    <span className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-paper/50">
                      {l.label}
                    </span>
                  </span>
                  <span className="flex items-center gap-2 font-mono text-[11px] text-paper/85 transition-colors group-hover:text-gold">
                    {l.value}
                    <ArrowUpRight
                      size={12}
                      strokeWidth={2}
                      className="opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                    />
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <p className="px-1 font-hand text-2xl text-gold/90">
            {profile.username} — {profile.based}
          </p>
        </div>
      </div>
    </div>
  );
}
