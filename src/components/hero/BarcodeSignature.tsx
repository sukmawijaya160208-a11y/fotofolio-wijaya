import { useId } from "react";
import { profile } from "../../data/profile";

function hashString(input: string) {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function buildBars(seed: string, count = 48) {
  const h = hashString(seed);
  let cursor = 0;
  const bars: { x: number; w: number; tall: boolean }[] = [];
  for (let i = 0; i < count; i++) {
    const bits = (h >>> (i % 24)) ^ (i * 37);
    const w = 1 + ((bits >> 3) % 3);
    const tall = (bits & 7) > 3;
    bars.push({ x: cursor, w, tall });
    cursor += w + 1 + ((bits >> 6) % 3);
  }
  return { bars, width: cursor + 2 };
}

export function BarcodeSignature({ dark = false }: { dark?: boolean }) {
  const maskId = useId();
  const { bars, width } = buildBars(profile.name);
  const barColor = dark ? "rgba(248,250,251,.9)" : "rgba(23,35,45,.9)";
  const labelColor = dark ? "text-paper/70" : "text-ink/85";

  return (
    <div className="flex flex-col items-end gap-2">
      <svg
        viewBox={`0 0 ${width} 44`}
        width={Math.min(width * 1.55, 168)}
        height={44}
        role="img"
        aria-label={`Barcode dekoratif tanda tangan ${profile.name}`}
      >
        <mask id={maskId}>
          <rect x="0" y="0" width={width} height="44" fill="white" />
          {bars.map((b, i) => (
            <rect
              key={i}
              x={b.x}
              y={b.tall ? 0 : 5}
              width={b.w}
              height={b.tall ? 44 : 34}
              fill="black"
            />
          ))}
        </mask>
        <rect
          x="0"
          y="0"
          width={width}
          height="44"
          fill={barColor}
          mask={`url(#${maskId})`}
        />
      </svg>
      <span className={`font-mono text-[9px] uppercase tracking-[0.2em] ${labelColor}`}>
        {profile.name}
      </span>
    </div>
  );
}
