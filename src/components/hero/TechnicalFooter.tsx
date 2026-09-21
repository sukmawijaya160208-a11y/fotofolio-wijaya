import { profile } from "../../data/profile";

export function TechnicalFooter() {
  return (
    <div className="flex items-end gap-3">
      <span className="font-mono text-[11px] leading-tight text-tech">//</span>
      <div className="flex flex-col gap-0.5">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/85">
          {profile.education}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
          {profile.university}
        </span>
      </div>
    </div>
  );
}
