import { motion, useReducedMotion } from "framer-motion";
import { profile } from "../../data/profile";

export function WijayaTitle() {
  const reduce = useReducedMotion();
  return (
    <motion.h1
      className="font-display select-none uppercase leading-[0.82] title-extrude"
      style={{
        fontSize: "clamp(64px, 12.2vw, 182px)",
        letterSpacing: "0.06em",
        transform: reduce ? undefined : "perspective(900px) rotateX(2.5deg)",
      }}
      initial={reduce ? false : { opacity: 0, y: 26 }}
      animate={reduce ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
    >
      {profile.displayName}
    </motion.h1>
  );
}

export function Slogan() {
  const reduce = useReducedMotion();
  return (
    <motion.p
      className="font-hand select-none text-burgundy/90"
      style={{ fontSize: "clamp(26px, 3.7vw, 52px)", lineHeight: 0.95 }}
      initial={reduce ? false : { opacity: 0, y: 10, rotate: -1.5 }}
      animate={reduce ? undefined : { opacity: 1, y: 0, rotate: -1.5 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.42 }}
      aria-hidden="true"
    >
      GOOD VIBES, BIGGER DREAMS.
    </motion.p>
  );
};

/**
 * Desktop-only slogan: split into two flanks anchored to the viewport
 * center with a fixed gap (50%-112px … 50%+60px) so the subject's face
 * (~122px wide in this band) never touches the text at ANY width.
 * >=1521px: single-line flanks. <1521px: left stacks 2 lines, right shortens.
 */
export function SloganFlanks() {
  const reduce = useReducedMotion();
  const init = reduce ? false : { opacity: 0, y: 10, rotate: -1.5 };
  const anim = reduce ? undefined : { opacity: 1, y: 0, rotate: -1.5 };
  const trans = { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const, delay: 0.42 };
  const base =
    "font-hand absolute top-0 select-none whitespace-nowrap text-burgundy/90";
  return (
    <>
      <motion.p
        className={`${base} right-[calc(50%+112px)] hidden text-right min-[1521px]:block`}
        style={{ fontSize: "clamp(26px, 3vw, 44px)", lineHeight: 0.95 }}
        initial={init}
        animate={anim}
        transition={trans}
        aria-hidden="true"
      >
        GOOD VIBES,
      </motion.p>
      <motion.p
        className={`${base} right-[calc(50%+112px)] block text-right min-[1521px]:hidden`}
        style={{ fontSize: "clamp(24px, 2.8vw, 42px)", lineHeight: 0.95 }}
        initial={init}
        animate={anim}
        transition={trans}
        aria-hidden="true"
      >
        GOOD VIBES,
        <br />
        BIGGER
      </motion.p>
      <motion.p
        className={`${base} left-[calc(50%+60px)] hidden min-[1521px]:block`}
        style={{ fontSize: "clamp(26px, 3vw, 44px)", lineHeight: 0.95 }}
        initial={init}
        animate={anim}
        transition={trans}
        aria-hidden="true"
      >
        BIGGER DREAMS.
      </motion.p>
      <motion.p
        className={`${base} left-[calc(50%+60px)] block min-[1521px]:hidden`}
        style={{ fontSize: "clamp(24px, 2.8vw, 42px)", lineHeight: 0.95 }}
        initial={init}
        animate={anim}
        transition={trans}
        aria-hidden="true"
      >
        DREAMS.
      </motion.p>
    </>
  );
}
