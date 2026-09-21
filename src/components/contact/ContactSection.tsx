import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Check, Mail } from "lucide-react";
import { contact, contactLinks } from "../../data/contact";
import { profile } from "../../data/profile";
import { PortfolioSection } from "../shared/PortfolioSection";
import { Reveal } from "../shared/Reveal";
import { HudLine, MicroLabel, TechnicalCorner } from "../shared/decorations";

function useJakartaTime() {
  const [time, setTime] = useState("--:--");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Jakarta",
      hour: "2-digit",
      minute: "2-digit",
    });
    const tick = () => setTime(`${fmt.format(new Date())} WIB`);
    tick();
    const id = setInterval(tick, 20_000);
    return () => clearInterval(id);
  }, []);
  return time;
}

function CopyEmailButton() {
  const [copied, setCopied] = useState(false);
  const onClick = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      window.location.href = `mailto:${contact.email}`;
    }
  };
  return (
    <button
      type="button"
      onClick={onClick}
      className="group inline-flex items-center gap-2.5 rounded-[10px] border border-paper/25 px-4 py-2.5 font-mono text-[10.5px] uppercase tracking-[0.12em] text-paper/85 transition-colors duration-200 hover:border-gold/70 hover:text-gold"
      aria-label="Salin alamat email"
    >
      <Mail size={13} className="text-gold" />
      <span className="normal-case tracking-[0.04em]">{contact.email}</span>
      <span className="ml-1 inline-flex items-center gap-1 text-[9px] uppercase tracking-[0.16em] text-paper/40 transition-colors group-hover:text-gold">
        {copied ? (
          <>
            <Check size={11} /> COPIED
          </>
        ) : (
          "COPY"
        )}
      </span>
    </button>
  );
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function ContactForm() {
  const reduce = useReducedMotion();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "sent">("idle");

  const validate = () => {
    const e: Record<string, string> = {};
    if (form.name.trim().length < 2) e.name = "Min. 2 characters.";
    if (!EMAIL_RE.test(form.email)) e.email = "Valid email required.";
    if (form.message.trim().length < 10) e.message = "Min. 10 characters.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setStatus("loading");
    const subject = encodeURIComponent(`PORTFOLIO — ${form.name}`);
    const body = encodeURIComponent(
      `${form.message}\n\n— ${form.name} (${form.email})`,
    );
    setTimeout(() => {
      setStatus("sent");
      window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
    }, reduce ? 0 : 600);
  };

  const field = (
    key: keyof typeof form,
    label: string,
    type = "text",
    multiline = false,
  ) => (
    <label className="flex flex-col gap-1.5">
      <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-paper/45">
        {label}
      </span>
      {multiline ? (
        <textarea
          required
          rows={3}
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          onFocus={() => setErrors((x) => ({ ...x, message: "" }))}
          className="resize-none rounded-[10px] border border-white/12 bg-black/35 px-3.5 py-2.5 font-mono text-[12px] text-paper outline-none transition-colors placeholder:text-paper/25 focus:border-gold/70"
          placeholder="Tell me about the idea…"
        />
      ) : (
        <input
          required
          type={type}
          value={form[key]}
          onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
          onFocus={() => setErrors((x) => ({ ...x, [key]: "" }))}
          className="rounded-[10px] border border-white/12 bg-black/35 px-3.5 py-2.5 font-mono text-[12px] text-paper outline-none transition-colors placeholder:text-paper/25 focus:border-gold/70"
          placeholder={key === "name" ? "Your name" : "you@example.com"}
        />
      )}
      {errors[key] && (
        <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-burgundy">
          {errors[key]}
        </span>
      )}
    </label>
  );

  return (
    <div className="relative overflow-hidden rounded-[16px] border border-white/12 bg-panel/70 p-5 backdrop-blur-md">
      <TechnicalCorner variant="top-right" size={12} />
      <div className="mb-4 flex items-center justify-between">
        <MicroLabel className="text-paper/45">TRANSMISSION FORM</MicroLabel>
        <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-emerald-400/80">
          ● MAILTO
        </span>
      </div>
      {status === "sent" ? (
        <div className="flex flex-col items-start gap-3 py-6">
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-gold">
            ✓ Mail client opening…
          </span>
          <p className="text-[12px] leading-relaxed text-paper/60">
            Nothing sent to a server — your mail composer has the message ready.
            If nothing opened, write directly to{" "}
            <a
              href={`mailto:${contact.email}`}
              className="text-gold underline underline-offset-2"
            >
              {contact.email}
            </a>
            .
          </p>
          <button
            type="button"
            onClick={() => {
              setStatus("idle");
              setForm({ name: "", email: "", message: "" });
            }}
            className="font-mono text-[10px] uppercase tracking-[0.16em] text-paper/45 transition-colors hover:text-paper"
          >
            ← Write another
          </button>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="flex flex-col gap-4" noValidate>
          {field("name", "NAME")}
          {field("email", "EMAIL", "email")}
          {field("message", "MESSAGE", "text", true)}
          <button
            type="submit"
            disabled={status === "loading"}
            className="group mt-1 inline-flex items-center justify-center gap-2.5 self-start rounded-[10px] bg-paper px-5 py-3 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-panel transition-transform duration-200 hover:-translate-y-0.5 disabled:opacity-60"
          >
            {status === "loading" ? "PREPARING…" : "SEND VIA EMAIL"}
            <ArrowUpRight
              size={14}
              strokeWidth={2}
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </button>
        </form>
      )}
    </div>
  );
}

export function ContactSection() {
  const localTime = useJakartaTime();
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

            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 border-y border-white/10 py-3">
              {[
                ["STATUS", contact.availability],
                ["LOCATION", profile.based.toUpperCase()],
                ["LOCAL TIME", localTime],
              ].map(([k, v]) => (
                <span key={k} className="flex items-baseline gap-2">
                  <MicroLabel className="text-paper/40">{k}</MicroLabel>
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-paper/85">
                    {v}
                  </span>
                </span>
              ))}
            </div>

            <HudLine className="my-8 max-w-[200px]" />

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${contact.email}`}
                className="group inline-flex items-center gap-2.5 rounded-[10px] bg-paper px-5 py-3 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-panel transition-transform duration-200 hover:-translate-y-0.5"
              >
                {contact.cta}
                <ArrowUpRight
                  size={14}
                  strokeWidth={2}
                  className="transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </a>
              <CopyEmailButton />
            </div>

            <ul className="mt-8 flex flex-col gap-px">
              {contactLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target={l.href.startsWith("http") ? "_blank" : undefined}
                    rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="group flex items-center justify-between gap-3 border-b border-white/8 py-2.5 transition-colors duration-200 last:border-0 hover:bg-white/[0.04]"
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
          </Reveal>
        </div>

        <div className="flex flex-col gap-6 lg:col-span-5">
          <Reveal variant="slide" direction="right" delay={0.15}>
            <ContactForm />
          </Reveal>
          <motion.p
            className="font-hand text-2xl text-gold/90"
            initial={false}
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
