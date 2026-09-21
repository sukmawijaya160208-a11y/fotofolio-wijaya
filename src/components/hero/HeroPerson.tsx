import { motion, useReducedMotion } from "framer-motion";
import { profile } from "../../data/profile";
import { assets } from "../../data/assets";
import { cx } from "../../lib/cx";

/**
 * Real user-supplied hero photograph (transparent cutout).
 * The wrapper is sized to the asset's exact aspect ratio so the image
 * is never letterboxed, distorted, or cropped — feet stay bottom-aligned
 * and the head is never cut. Treat the photo as immutable editorial
 * photography: no filters, no regeneration, only layout + shadow.
 */
export function HeroPerson({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={cx("pointer-events-none z-20", className)}
      initial={reduce ? false : { opacity: 0, y: 30 }}
      animate={reduce ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
    >
      <img
        src={profile.heroImage}
        alt="Muhammad Sukma Wijaya dalam balutan busana formal"
        fetchPriority="high"
        decoding="async"
        width={assets.heroWidth}
        height={assets.heroHeight}
        className="h-full w-auto object-contain drop-shadow-[0_30px_45px_rgba(23,35,45,0.28)]"
      />
    </motion.div>
  );
}
