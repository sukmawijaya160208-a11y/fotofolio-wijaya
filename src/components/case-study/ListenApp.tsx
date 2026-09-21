import { useState } from "react";
import {
  ArrowUpRight,
  Heart,
  SkipBack,
  SkipForward,
} from "lucide-react";
import { mixTracks, spotifyEmbed, spotifyUrl } from "../../data/playlist";
import { MicroLabel } from "../shared/decorations";
import { cx } from "../../lib/cx";

/**
 * Section 07-B — FOCUS MIX glass player.
 * Adaptasi glassmorphism-listen prompt ke tema proyek (dark + gold, tanpa
 * shadcn). Setiap kontrol BENERAN fungsi: ganti track, like lokal, buka di
 * Spotify, embed playback asli. Tanpa progress/time fake.
 */
export function ListenApp() {
  const [activeIndex, setActiveIndex] = useState(1);
  const [liked, setLiked] = useState<Record<string, boolean>>({});
  const active = mixTracks[activeIndex];

  const step = (dir: 1 | -1) =>
    setActiveIndex((i) => (i + dir + mixTracks.length) % mixTracks.length);

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

      <div className="relative z-10 grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <MicroLabel className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-paper/70">
            FOCUS MIX — SAMPLE PLAYLIST
          </MicroLabel>
          <h3 className="mt-5 font-display text-4xl uppercase leading-[0.9] text-paper md:text-5xl">
            SUARA BUAT FOKUS NGEGAS
          </h3>
          <p className="mt-4 max-w-[420px] text-[13px] leading-relaxed text-paper/60">
            Playlist temen ngoding. Klik track buat ganti — player Spotify
            asli di kanan yang muterin. Ganti isi playlist di{" "}
            <span className="font-mono text-[11px] text-gold/80">src/data/playlist.ts</span>.
          </p>

          <ul className="mt-7 flex max-h-[380px] flex-col gap-2.5 overflow-y-auto pr-1">
            {mixTracks.map((t, i) => {
              const on = i === activeIndex;
              return (
                <li key={t.id}>
                  <button
                    type="button"
                    onClick={() => setActiveIndex(i)}
                    aria-pressed={on}
                    className={cx(
                      "group flex w-full items-center gap-4 rounded-[16px] border p-4 text-left backdrop-blur-xl transition-all duration-300",
                      on
                        ? "border-gold/50 bg-gold/[0.08] shadow-[0_16px_48px_rgba(0,0,0,.4)]"
                        : "border-white/10 bg-black/30 hover:-translate-y-0.5 hover:border-white/25",
                    )}
                  >
                    <span
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-display text-lg text-panel"
                      style={{ background: `linear-gradient(135deg, hsl(${t.hue} 70% 60%), hsl(${(t.hue + 40) % 360} 70% 45%))` }}
                      aria-hidden="true"
                    >
                      {t.title.charAt(0)}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[14px] font-semibold text-paper">
                        {t.title}
                      </span>
                      <span className="block truncate text-[12px] text-paper/55">
                        {t.artist} · {t.album}
                      </span>
                    </span>
                    <span className="shrink-0 font-mono text-[10px] tracking-[0.14em] text-paper/40">
                      {t.duration}
                    </span>
                    {on && (
                      <span className="flex shrink-0 items-end gap-[3px]" aria-hidden="true">
                        {[10, 16, 8, 13].map((h, k) => (
                          <span
                            key={k}
                            className="w-[3px] rounded-full bg-gold"
                            style={{ height: h, animation: `eq 0.9s ease-in-out ${k * 0.15}s infinite alternate` }}
                          />
                        ))}
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="flex flex-col gap-4 lg:sticky lg:top-6 lg:self-start">
          <div className="rounded-[18px] border border-white/10 bg-black/40 p-5 backdrop-blur-xl md:p-6">
            <div className="flex items-start gap-4">
              <div
                className="relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/15"
                style={{ background: `linear-gradient(135deg, hsl(${active.hue} 70% 45%), hsl(${(active.hue + 50) % 360} 75% 22%))` }}
                aria-hidden="true"
              >
                <span className="font-display text-3xl text-white/90">
                  {active.title.charAt(0)}
                </span>
                <span className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.35),transparent_60%)]" />
              </div>
              <div className="min-w-0 flex-1">
                <MicroLabel className="text-paper/45">NOW PLAYING</MicroLabel>
                <h4 className="mt-1.5 truncate text-xl font-semibold tracking-tight text-paper">
                  {active.title}
                </h4>
                <p className="truncate text-[13px] text-paper/55">
                  {active.artist} · {active.album}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setLiked((m) => ({ ...m, [active.id]: !m[active.id] }))}
                aria-label={liked[active.id] ? "Hapus dari favorit" : "Tandai favorit"}
                aria-pressed={!!liked[active.id]}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-paper/60 transition-colors hover:border-gold/50 hover:text-gold"
              >
                <Heart
                  size={15}
                  strokeWidth={2}
                  className={liked[active.id] ? "fill-gold text-gold" : ""}
                />
              </button>
            </div>

            <div className="mt-5 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Track sebelumnya"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-paper/70 transition-colors hover:border-gold/50 hover:text-gold"
              >
                <SkipBack size={16} strokeWidth={2} />
              </button>
              <a
                href={spotifyUrl(active.id)}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-panel transition-transform duration-200 hover:-translate-y-0.5"
              >
                OPEN IN SPOTIFY
                <ArrowUpRight size={14} strokeWidth={2} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Track berikutnya"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-paper/70 transition-colors hover:border-gold/50 hover:text-gold"
              >
                <SkipForward size={16} strokeWidth={2} />
              </button>
            </div>

            <div className="mt-5 overflow-hidden rounded-2xl border border-white/10 bg-black/60">
              <iframe
                key={active.id}
                className="h-[152px] w-full"
                src={spotifyEmbed(active.id)}
                title={`${active.title} — Spotify player`}
                loading="lazy"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              />
            </div>
          </div>
        </div>
      </div>

      <style>{`@keyframes eq { from { transform: scaleY(0.4); } to { transform: scaleY(1); } }`}</style>
    </div>
  );
}
