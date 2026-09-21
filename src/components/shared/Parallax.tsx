import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { ReactNode } from "react";
import { cx } from "../../lib/cx";

type ParallaxProps = {
  children: ReactNode;
  className?: string;
  amount?: number;
};

export function Parallax({ children, className, amount = 40 }: ParallaxProps) {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [amount, -amount]);

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div className={cx(className)} style={{ y }}>
      {children}
    </motion.div>
  );
}
