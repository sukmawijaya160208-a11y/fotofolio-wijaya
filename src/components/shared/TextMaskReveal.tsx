import { motion, useReducedMotion } from "framer-motion";
import { cx } from "../../lib/cx";

type TextMaskRevealProps = {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
};

export function TextMaskReveal({
  text,
  className,
  delay = 0,
  duration = 0.9,
  as = "span",
}: TextMaskRevealProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];
  const lines = text.split("\n");

  return (
    <MotionTag className={cx("block", className)} aria-label={text}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden">
          <motion.span
            className="block"
            aria-hidden={reduce ? undefined : "true"}
            initial={reduce ? false : { y: "110%" }}
            whileInView={reduce ? undefined : { y: 0 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration, delay: delay + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}
