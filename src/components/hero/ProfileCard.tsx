import { BadgeCheck } from "lucide-react";
import { profile } from "../../data/profile";
import { Reveal } from "../shared/Reveal";
import { TechnicalCorner } from "../shared/decorations";

export function ProfileCard() {
  return (
    <Reveal
      variant="slide"
      direction="up"
      delay={0.55}
      duration={0.8}
      className="relative w-full max-w-[400px] overflow-hidden rounded-[20px] border border-line bg-paper shadow-[0_12px_30px_rgba(23,35,45,.12)]"
    >
      <TechnicalCorner variant="top-right" size={12} />
      <div className="flex items-center gap-3.5 px-5 pt-4">
        <img
          src={profile.portraitImage}
          alt="Foto profil Muhammad Sukma Wijaya"
          width={56}
          height={56}
          loading="lazy"
          decoding="async"
          className="h-14 w-14 rounded-full border-2 border-paper object-cover shadow-[0_4px_12px_rgba(23,35,45,.18)] grayscale-[0.25]"
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <h2 className="font-display text-xl uppercase leading-none text-ink">
              {profile.displayName}
            </h2>
            <BadgeCheck size={16} className="shrink-0 text-burgundy" aria-hidden="true" />
          </div>
          <p className="mt-1 font-mono text-[10.5px] tracking-[0.06em] text-muted">
            {profile.username}
          </p>
          <span className="mt-1.5 inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-emerald-700">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
            ONLINE
          </span>
        </div>
      </div>
      <p className="mx-5 mt-3 border-l-2 border-burgundy/40 pl-3 font-mono text-[10.5px] italic leading-relaxed text-ink/80">
        “{profile.quote}”
      </p>
      <div className="mt-3.5 grid grid-cols-3 rounded-[14px] bg-panel px-2 py-3 text-paper">
        {[
          { v: profile.stats.posts, l: "POSTINGAN" },
          { v: profile.stats.followers, l: "PENGIKUT" },
          { v: profile.stats.following, l: "MENGIKUTI" },
        ].map((s) => (
          <div key={s.l} className="flex flex-col items-center gap-1">
            <span className="font-display text-xl leading-none">{s.v}</span>
            <span className="font-mono text-[8.5px] uppercase tracking-[0.12em] text-paper/55">
              {s.l}
            </span>
          </div>
        ))}
      </div>
    </Reveal>
  );
}
