import { useState } from "react";
import { ArrowUpRight, Play } from "lucide-react";
import { cx } from "../../lib/cx";
import { embedUrl, showcaseVideos, videoThumb } from "../../data/videoShowcase";
import { MicroLabel } from "../shared/decorations";

/**
 * Section 07-A — elastic video accordion.
 * Adaptasi elastic-gallery prompt ke Vite + data proyek (tanpa Next/Image,
 * tanpa shadcn). Panel: thumbnail YouTube → klik expand → klik play = iframe
 * nocookie (lazy, tidak ada cost embed sebelum diminta).
 */
export function VideoAccordion() {
  const [activeId, setActiveId] = useState<string | null>("03");
  const [playingId, setPlayingId] = useState<string | null>(null);

  return (
    <div className="mx-auto flex h-[520px] w-full flex-col gap-2 md:h-[600px] md:flex-row md:gap-4">
      {showcaseVideos.map((item) => {
        const active = activeId === item.id;
        const playing = playingId === item.id;
        return (
          <div
            key={item.id}
            role="button"
            tabIndex={0}
            aria-label={`${active ? "Putar" : "Buka"} ${item.title}`}
            onMouseEnter={() => setActiveId(item.id)}
            onClick={() => {
              if (!active) {
                setActiveId(item.id);
                return;
              }
              setPlayingId(item.id);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                if (!active) setActiveId(item.id);
                else setPlayingId(item.id);
              }
            }}
            className={cx(
              "group relative cursor-pointer overflow-hidden rounded-[18px] border border-white/12 bg-black",
              "transition-[flex,filter] duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]",
              active ? "flex-[4]" : "flex-[1]",
              active ? "brightness-100" : "brightness-50 hover:brightness-75",
            )}
          >
            {playing ? (
              <iframe
                className="absolute inset-0 h-full w-full"
                src={embedUrl(item.videoId)}
                title={item.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            ) : (
              <>
                <img
                  src={videoThumb(item.videoId)}
                  alt={`Thumbnail ${item.title}`}
                  width={640}
                  height={480}
                  loading="lazy"
                  decoding="async"
                  className={cx(
                    "absolute inset-0 h-full w-full object-cover transition-transform duration-1000",
                    active ? "scale-100" : "scale-110",
                  )}
                />
                <div
                  className={cx(
                    "absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500",
                    active ? "opacity-100" : "opacity-0",
                  )}
                  aria-hidden="true"
                />
              </>
            )}

            {!playing && (
              <div className="absolute bottom-0 left-0 right-0 flex h-full flex-col justify-end p-4 md:p-8">
                <div
                  className={cx(
                    "flex flex-col gap-2 transition-all duration-500",
                    active ? "translate-y-0 opacity-100 delay-200" : "translate-y-12 opacity-0",
                  )}
                >
                  <div className="flex items-center gap-2">
                    <MicroLabel className="rounded-full border border-white/30 bg-white/10 px-2.5 py-1 text-white backdrop-blur-md">
                      {item.category}
                    </MicroLabel>
                  </div>
                  <h3 className="font-display text-2xl uppercase leading-none text-white md:text-5xl">
                    {item.title}
                  </h3>
                  <span className="mt-2 inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-white/80 md:mt-4 md:text-sm">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gold text-panel transition-transform duration-300 group-hover:scale-110">
                      <Play size={14} strokeWidth={2.5} className="translate-x-[1px]" />
                    </span>
                    PLAY VIDEO <ArrowUpRight size={14} strokeWidth={2} />
                  </span>
                </div>

                <div
                  className={cx(
                    "absolute bottom-4 left-1/2 -translate-x-1/2 transition-all duration-500 md:bottom-8",
                    active ? "scale-50 opacity-0" : "opacity-100 delay-500",
                  )}
                  aria-hidden="true"
                >
                  <span className="hidden whitespace-nowrap font-display text-xl uppercase tracking-wider text-white [writing-mode:vertical-rl] md:block">
                    {item.title}
                  </span>
                  <span className="block font-display text-sm text-white md:hidden">
                    {item.id}
                  </span>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
