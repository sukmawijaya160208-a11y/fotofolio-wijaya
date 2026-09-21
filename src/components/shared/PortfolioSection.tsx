import type { ReactNode } from "react";
import { MotionConfig } from "framer-motion";
import { cx } from "../../lib/cx";
import { SectionIndex } from "./decorations";

type Theme = "light" | "dark" | "panel";

type PortfolioSectionProps = {
  id: string;
  index: number;
  label?: string;
  theme?: Theme;
  className?: string;
  minHeight?: string;
  children: ReactNode;
  bleed?: boolean;
};

const themeClasses: Record<Theme, string> = {
  light: "bg-bg text-ink",
  dark: "bg-dark text-paper",
  panel: "bg-panel text-paper",
};

export function PortfolioSection({
  id,
  index,
  label,
  theme = "light",
  className,
  minHeight,
  children,
  bleed = false,
}: PortfolioSectionProps) {
  return (
    <MotionConfig reducedMotion="user">
      <section
        id={id}
        className={cx(
          "relative w-full overflow-hidden",
          themeClasses[theme],
          !bleed && "px-6 md:px-10 lg:px-[clamp(40px,6vw,96px)]",
          className,
        )}
        style={{ minHeight: minHeight ?? undefined }}
        aria-labelledby={`${id}-title`}
      >
        <div
          className="pointer-events-none absolute left-[clamp(20px,4vw,56px)] top-10 z-10 flex items-center gap-3"
          aria-hidden="true"
        >
          <SectionIndex index={index} />
          {label && (
            <>
              <span className="h-px w-8 bg-line" />
              <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted">
                {label}
              </span>
            </>
          )}
        </div>
        {children}
      </section>
    </MotionConfig>
  );
}
