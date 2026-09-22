import { useEffect, useRef, useState } from "react";
import { useReducedMotion, useScroll } from "framer-motion";
import { useInView } from "../../lib/useInView";

/**
 * Background video yang di-scrub oleh scroll (turun = maju, naik = mundur).
 * - Tidak pernah play(): frame digerakkan via currentTime → lolos autoplay policy.
 * - Target di-lerp via rAF → gerak smooth, no stutter.
 * - src dipasang hanya saat section dekat viewport (lazy).
 * - HP (<768px): file ringan + lerp agresif (gercep) + seek hanya saat
 *   decoder siap (readyState) → no lag, no stall.
 * - reduced-motion / error → frame pertama statis / background polos.
 */
export function ScrollVideo({
  src,
  srcMobile,
  poster,
  label,
  targetRef,
  cinema,
}: {
  src: string;
  /** Versi ringan untuk HP (dipilih otomatis di bawah 768px). */
  srcMobile?: string;
  /** Frame pembuka instan selagi video buffer. */
  poster?: string;
  label: string;
  /** Elemen yang progres scroll-nya dipetakan ke durasi video. Default: boks video sendiri (mode transit). Untuk mode pinned, kirim ref kontainer tinggi dari parent. */
  targetRef?: React.RefObject<HTMLElement | null>;
  /** Mode cinema: di layar portrait, video tampil utuh (contain, tajam 1:1)
   *  di atas background blur dari poster — bukan di-crop-zoom 3.5x. */
  cinema?: boolean;
}) {
  const reduce = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [srcUrl, setSrcUrl] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);
  const near = useInView<HTMLDivElement>({ threshold: 0, rootMargin: "800px 0px" });
  const nearRef = useRef(false);
  nearRef.current = near.inView;
  const target = useRef(0);
  const current = useRef(0);
  const mobile =
    typeof window !== "undefined" && window.innerWidth < 768;
  const file = mobile && srcMobile ? srcMobile : src;
  // HP gercep (0.35), desktop sinematik (0.14).
  const rate = mobile ? 0.35 : 0.14;

  const { scrollYProgress } = useScroll({
    target: targetRef ?? wrapRef,
    offset: ["start end", "end start"],
  });

  useEffect(() => {
    if (near.inView && !srcUrl) setSrcUrl(file);
  }, [near.inView, srcUrl, file]);

  useEffect(() => scrollYProgress.on("change", (v) => {
    target.current = v;
  }), [scrollYProgress]);

  useEffect(() => {
    let id = 0;
    let lastSet = -1;
    const FPS = 24;
    const tick = () => {
      const v = videoRef.current;
      if (v && v.duration && Number.isFinite(v.duration) && !reduce && nearRef.current) {
        current.current += (target.current - current.current) * rate;
        // Snap ke grid frame (24fps) — seek selalu mendarat tepat, no ghosting.
        const t = Math.round(Math.min(Math.max(current.current, 0), 1) * v.duration * FPS) / FPS;
        // HP: jangan seek kalau decoder belum siap → no stall.
        if (Math.abs(t - lastSet) > 1 / FPS / 2 && v.readyState >= 2) {
          try {
            v.currentTime = t;
            lastSet = t;
          } catch {
            /* seek belum siap — coba frame berikut */
          }
        }
      }
      id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [reduce, rate]);

  if (failed) return null;

  return (
    <div ref={near.ref} className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <div ref={wrapRef} className="absolute inset-0" />
      {cinema && poster && (
        <img
          src={poster}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 hidden h-full w-full scale-110 object-cover blur-2xl brightness-[0.55] portrait:block"
        />
      )}
      {srcUrl && (
        <video
          ref={videoRef}
          src={srcUrl}
          poster={poster}
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          aria-label={label}
          onError={() => setFailed(true)}
          className={
            cinema
              ? "absolute inset-0 h-full w-full object-cover landscape:[filter:brightness(1.06)_saturate(1.08)] portrait:object-contain"
              : "h-full w-full object-cover [filter:brightness(1.06)_saturate(1.08)]"
          }
        />
      )}
    </div>
  );
}
