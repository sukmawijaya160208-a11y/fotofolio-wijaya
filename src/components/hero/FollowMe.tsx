import { profile } from "../../data/profile";
import { Reveal } from "../shared/Reveal";
import { HudLine } from "../shared/decorations";

const links = [
  { label: "Instagram", value: profile.social.instagram },
  { label: "Facebook", value: profile.social.facebook },
  { label: "TikTok", value: profile.social.tiktok },
  { label: "Pinterest", value: profile.social.pinterest },
  { label: "Website", value: profile.social.website },
];

export function FollowMe() {
  return (
    <Reveal
      variant="fade"
      delay={0.7}
      className="w-full max-w-[210px]"
    >
      <h3 className="font-mono text-[10px] font-medium uppercase tracking-[0.26em] text-ink">
        FOLLOW ME
      </h3>
      <HudLine className="mt-2" width="100%" />
      <ul className="mt-2.5 flex flex-col">
        {links.map((l) => (
          <li
            key={l.label}
            className="flex items-baseline justify-between border-b border-line/50 py-1.5 last:border-0"
          >
            <span className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-muted">
              {l.label}
            </span>
            <span className="font-mono text-[10px] text-ink/80">{l.value}</span>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}
