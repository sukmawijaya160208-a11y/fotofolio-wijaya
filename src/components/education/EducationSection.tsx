import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { certificates, education } from "../../data/education";
import { PortfolioSection } from "../shared/PortfolioSection";
import { Reveal } from "../shared/Reveal";
import { ScrollVideo } from "../shared/ScrollVideo";
import { X } from "lucide-react";
import { HudLine, MicroLabel, TechnicalCorner } from "../shared/decorations";

function CertificateModal({
  cert,
  onClose,
}: {
  cert: (typeof certificates)[number] | null;
  onClose: () => void;
}) {
  const reduce = useReducedMotion();
  return (
    <AnimatePresence>
      {cert && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-dark/70 p-5 backdrop-blur-sm"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduce ? undefined : { opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`Pratinjau sertifikat ${cert.title}`}
        >
          <motion.div
            className="relative w-full max-w-[640px] overflow-hidden rounded-[18px] border border-line bg-paper shadow-2xl"
            initial={reduce ? false : { scale: 0.94, y: 16 }}
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
              src={cert.image}
              alt={`Sertifikat ${cert.title} dari ${cert.issuer}`}
              width={640}
              height={420}
              className="h-auto w-full object-cover"
            />
            <div className="flex items-end justify-between gap-4 p-5">
              <div>
                <h3 className="font-display text-2xl uppercase leading-none text-ink">
                  {cert.title}
                </h3>
                <MicroLabel className="mt-2">{cert.issuer}</MicroLabel>
              </div>
              <MicroLabel>{cert.date}</MicroLabel>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function CertificateCard({
  cert,
  index,
  onOpen,
}: {
  cert: (typeof certificates)[number];
  index: number;
  onOpen: () => void;
}) {
  const featured = cert.featured;
  return (
    <Reveal
      variant="scale"
      delay={index * 0.08}
      className={featured ? "lg:col-span-6 lg:row-span-2" : "lg:col-span-3"}
    >
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Buka pratinjau sertifikat ${cert.title}`}
        className={`group relative block w-full overflow-hidden rounded-[16px] border border-white/10 bg-panel text-left shadow-[0_14px_36px_rgba(18,28,37,.3)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1.5 hover:shadow-[0_22px_52px_rgba(18,28,37,.42)] ${
          featured ? "h-full min-h-[280px]" : "h-[200px]"
        }`}
      >
        <img
          src={cert.image}
          alt={`Sertifikat ${cert.title}`}
          width={featured ? 640 : 360}
          height={featured ? 420 : 260}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover grayscale transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-panel via-panel/35 to-transparent" />
        <TechnicalCorner variant="top-right" size={12} />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <MicroLabel className="text-gold/85">{cert.date}</MicroLabel>
          <h3
            className={`mt-1.5 font-display uppercase leading-none text-paper ${
              featured ? "text-3xl" : "text-xl"
            }`}
          >
            {cert.title}
          </h3>
          <MicroLabel className="mt-1.5 text-paper/60">{cert.issuer}</MicroLabel>
        </div>
        <span className="absolute right-4 top-12 font-mono text-[9px] uppercase tracking-[0.18em] text-paper/40">
          view
        </span>
      </button>
    </Reveal>
  );
}

export function EducationSection() {
  const [openCert, setOpenCert] = useState<(typeof certificates)[number] | null>(null);

  return (
    <PortfolioSection
      id="education"
      index={8}
      label="EDUCATION"
      theme="dark"
      className="flex items-center py-[var(--section-pad)]"
      minHeight="100vh"
    >
      <ScrollVideo
        src="/assets/education-bg.mp4"
        srcMobile="/assets/education-bg-m.mp4"
        poster="/assets/education-bg-poster.webp"
        label="Video latar pendidikan"
      />
      {/* Edge gradients only — tengah dibiarkan cerah sesuai permintaan */}
      <div
        className="pointer-events-none absolute inset-0 z-[5]"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(180deg, rgba(3,5,7,.72) 0%, transparent 22%, transparent 72%, rgba(3,5,7,.78) 100%)",
        }}
      />
      <div className="relative z-10 w-full">
        <Reveal className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <MicroLabel>WHAT I HAVE LEARNED</MicroLabel>
            <h2 className="mt-3 font-display text-4xl uppercase leading-none text-paper md:text-5xl">
              ARCHIVE
            </h2>
          </div>
          <div className="max-w-[420px] rounded-[14px] border border-white/10 bg-panel/70 p-4">
            <MicroLabel className="text-gold/85">{education.status}</MicroLabel>
            <h3 className="mt-2 font-display text-xl uppercase leading-none text-paper">
              {education.degree}
            </h3>
            <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-paper/55">
              {education.school}
            </p>
            <HudLine className="my-3" width="100%" />
            <ul className="flex flex-wrap gap-1.5">
              {education.subjects.map((s) => (
                <li
                  key={s}
                  className="rounded-sm border border-white/12 bg-white/[0.05] px-1.5 py-0.5 font-mono text-[8.5px] uppercase tracking-[0.12em] text-paper/60"
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-12">
          {certificates.map((cert, i) => (
            <CertificateCard
              key={cert.id}
              cert={cert}
              index={i}
              onOpen={() => setOpenCert(cert)}
            />
          ))}
        </div>
      </div>
      <CertificateModal cert={openCert} onClose={() => setOpenCert(null)} />
    </PortfolioSection>
  );
}
