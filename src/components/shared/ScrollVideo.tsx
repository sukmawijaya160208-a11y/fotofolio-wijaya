import { useEffect, useRef, useState } from "react";
import { useReducedMotion, useScroll } from "framer-motion";
import { useInView } from "../../lib/useInView";

/**
 * Background video yang di-scrub oleh scroll (turun = maju, naik = mundur).
 * - Tidak pernah play(): frame digerakkan via currentTime → lolos autoplay policy.
 * - Target di-lerp via rAF (0.12) → gerak smooth, no stutter.
 * - src dipasang hanya saat section dekat viewport (lazy).
 * - reduced-motion / error → frame pertama statis / background polos.
 */
export function ScrollVideo({
  src,
  label,
  targetRef,
}: {
  src: string;
  label: string;
  /** Elemen yang progres scroll-nya dipetakan ke durasi video. Default: boks video sendiri (mode transit). Untuk mode pinned, kirim ref kontainer tinggi dari parent. */
  targetRef?: React.RefObject<HTMLElement | null>;
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

  const { scrollYProgress } = useScroll({
    target: targetRef ?? wrapRef,
    offset: ["start end", "end start"],
  });

  useEffect(() => {
    if (near.inView && !srcUrl) setSrcUrl(src);
  }, [near.inView, srcUrl, src]);

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
        current.current += (target.current - current.current) * 0.14;
        // Snap ke grid frame (24fps) — seek selalu mendarat tepat, no ghosting.
        const t = Math.round(Math.min(Math.max(current.current, 0), 1) * v.duration * FPS) / FPS;
        if (Math.abs(t - lastSet) > 1 / FPS / 2) {
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
  }, [reduce]);

  if (failed) return null;

  return (
    <div ref={near.ref} className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <div ref={wrapRef} className="absolute inset-0" />
      {srcUrl && (
        <video
          ref={videoRef}
          src={srcUrl}
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          aria-label={label}
          onError={() => setFailed(true)}
          className="h-full w-full object-cover"
          style={{ filter: "brightness(1.06) saturate(1.08)" }}
        />
      )}
    </div>
  );
}
