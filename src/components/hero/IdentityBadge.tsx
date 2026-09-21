import { profile } from "../../data/profile";
import { TechnicalCorner } from "../shared/decorations";

export function IdentityBadge() {
  return (
    <div className="relative flex items-center gap-3">
      <div className="relative flex h-[52px] w-[52px] flex-col items-center justify-center rounded-[10px] bg-panel text-paper shadow-[0_8px_20px_rgba(23,35,45,.28)]">
        <span className="font-mono text-[9px] tracking-[0.22em] text-paper/70">IDN</span>
        <span className="font-display text-lg leading-none">48</span>
        <span className="absolute right-1 top-1 h-1 w-1 rounded-full bg-gold" />
      </div>
      <div className="leading-tight">
        <span className="block font-mono text-[9.5px] font-medium uppercase tracking-[0.2em] text-ink">
          NEW GENERATION
        </span>
        <span className="block font-mono text-[9.5px] uppercase tracking-[0.2em] text-muted">
          INDONESIAN YOUTH
        </span>
      </div>
      <TechnicalCorner variant="top-left" size={9} className="absolute -left-1.5 -top-1.5" />
    </div>
  );
}

export function VersionBadge() {
  return (
    <div className="relative inline-flex items-center gap-2 rounded-full border border-line bg-paper/70 py-1.5 pl-2.5 pr-3.5 shadow-[0_4px_14px_rgba(23,35,45,.10)] backdrop-blur">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-burgundy/50" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-burgundy" />
      </span>
      <span className="font-mono text-[10px] font-medium tracking-[0.18em] text-ink">
        {profile.version}
      </span>
    </div>
  );
}
