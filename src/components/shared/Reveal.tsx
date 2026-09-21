import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { cx } from "../../lib/cx";

type RevealProps = {
  children: ReactNode;
  className?: string;
  variant?: "fade" | "blur" | "slide" | "scale";
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  duration?: number;
  as?: "div" | "section" | "span" | "li" | "p" | "h2" | "h3";
  once?: boolean;
};

const offset = 28;

function getInitial(variant: RevealProps["variant"], direction: RevealProps["direction"]) {
  switch (variant) {
    case "blur":
      return { opacity: 0, filter: "blur(14px)" };
    case "scale":
      return { opacity: 0, scale: 0.94 };
    case "slide": {
      const map = {
        up: { y: offset },
        down: { y: -offset },
        left: { x: offset },
        right: { x: -offset },
      } as const;
      return { opacity: 0, ...map[direction ?? "up"] };
    }
    default:
      return { opacity: 0, y: 14 };
  }
}

export function Reveal({
  children,
  className,
  variant = "fade",
  direction = "up",
  delay = 0,
  duration = 0.7,
  as = "div",
  once = true,
}: RevealProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];
  const initial = reduce ? false : getInitial(variant, direction);

  return (
    <MotionTag
      className={cx(className)}
      initial={initial}
      whileInView={reduce ? undefined : { opacity: 1, x: 0, y: 0, scale: 1, filter: "blur(0px)" }}
      viewport={{ once, margin: "0px 0px -14% 0px" }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}

export function BlurReveal(props: Omit<RevealProps, "variant">) {
  return <Reveal {...props} variant="blur" />;
}

export function SlideReveal(props: Omit<RevealProps, "variant">) {
  return <Reveal {...props} variant="slide" />;
}

export function ScaleReveal(props: Omit<RevealProps, "variant">) {
  return <Reveal {...props} variant="scale" />;
}
