import type { CSSProperties } from "react";
import { cx } from "../../lib/cx";

export function MicroLabel({
  children,
  className,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <span
      className={cx(
        "font-mono text-[10px] uppercase tracking-[0.22em] text-muted",
        className,
      )}
      style={style}
    >
      {children}
    </span>
  );
}

export function SectionIndex({ index, className }: { index: number; className?: string }) {
  return (
    <span
      className={cx("font-mono text-[11px] tracking-[0.2em] text-tech/80", className)}
      aria-hidden="true"
    >
      {String(index).padStart(2, "0")}
    </span>
  );
}

type CornerVariant = "top-left" | "top-right" | "bottom-left" | "bottom-right";

const cornerMap: Record<CornerVariant, string> = {
  "top-left": "top-0 left-0 border-t border-l",
  "top-right": "top-0 right-0 border-t border-r",
  "bottom-left": "bottom-0 left-0 border-b border-l",
  "bottom-right": "bottom-0 right-0 border-b border-r",
};

export function TechnicalCorner({
  variant = "top-left",
  size = 14,
  className,
}: {
  variant?: CornerVariant;
  size?: number;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={cx(
        "pointer-events-none absolute border-line",
        cornerMap[variant],
        className,
      )}
      style={{ width: size, height: size }}
    />
  );
}

export function HudLine({
  className,
  width = "100%",
  vertical = false,
}: {
  className?: string;
  width?: string | number;
  vertical?: boolean;
}) {
  return (
    <span
      aria-hidden="true"
      className={cx("hairline pointer-events-none block", className)}
      style={
        vertical
          ? { width: 1, height: width, background: "rgba(39,57,70,.22)" }
          : { height: 1, width }
      }
    />
  );
}

export function Crosshair({ className, size = 9 }: { className?: string; size?: number }) {
  return (
    <span
      aria-hidden="true"
      className={cx("pointer-events-none absolute", className)}
      style={{ width: size, height: size }}
    >
      <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-line" />
      <span className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-line" />
    </span>
  );
}

export function DataPoint({ className, label }: { className?: string; label?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cx("pointer-events-none absolute flex items-center gap-1.5", className)}
    >
      <span className="block h-1.5 w-1.5 rounded-full bg-burgundy/70" />
      {label && (
        <span className="font-mono text-[9px] tracking-[0.18em] text-muted">{label}</span>
      )}
    </span>
  );
}

export function SlashMarker({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cx("font-mono text-[11px] text-tech/70", className)}
    >
      /
    </span>
  );
}

export function ScanLine({ className, delay = 0 }: { className?: string; delay?: number }) {
  return (
    <span
      aria-hidden="true"
      className={cx("pointer-events-none absolute inset-x-0 h-px bg-burgundy/55", className)}
      style={{
        animation: "scanline 3.4s ease-in-out infinite",
        animationDelay: `${delay}s`,
      }}
    />
  );
}

export function BlueprintFrame({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cx("pointer-events-none absolute inset-0 border border-line/60", className)}
    />
  );
}

export function GridOverlay({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cx("pointer-events-none absolute inset-0 opacity-[0.5]", className)}
      style={{
        backgroundImage:
          "linear-gradient(rgba(39,57,70,.07) 1px, transparent 1px), linear-gradient(90deg, rgba(39,57,70,.07) 1px, transparent 1px)",
        backgroundSize: "64px 64px",
      }}
    />
  );
}
