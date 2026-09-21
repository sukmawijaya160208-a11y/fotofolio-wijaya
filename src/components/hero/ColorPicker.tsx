import { useState } from "react";
import { cx } from "../../lib/cx";

const swatches = [
  { id: "burgundy", label: "Burgundy", value: "#7f0d22" },
  { id: "navy", label: "Navy", value: "#25313b" },
  { id: "graphite", label: "Graphite", value: "#4a5560" },
  { id: "gold", label: "Gold", value: "#b78a1f" },
  { id: "slate", label: "Slate", value: "#5b6b7a" },
];

export function ColorPicker() {
  const [active, setActive] = useState(swatches[0].id);
  const activeValue = swatches.find((s) => s.id === active)?.value ?? swatches[0].value;

  return (
    <div
      className="flex flex-col items-center gap-2.5 rounded-full border border-line bg-paper/80 px-2.5 py-4 shadow-[0_8px_22px_rgba(23,35,45,.12)] backdrop-blur"
      role="group"
      aria-label="Pemilih warna aksen"
    >
      <span className="font-mono text-[8.5px] font-medium uppercase tracking-[0.2em] text-muted">
        COLOR
      </span>
      <span className="h-px w-5 bg-line" />
      <div className="flex flex-col items-center gap-2">
        {swatches.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => {
              setActive(s.id);
              document.documentElement.style.setProperty("--accent", s.value);
            }}
            aria-pressed={active === s.id}
            aria-label={`Set warna aksen ke ${s.label}`}
            className={cx(
              "h-7 w-7 rounded-full border transition-transform duration-200",
              active === s.id
                ? "scale-110 border-ink shadow-[0_0_0_2px_rgba(255,255,255,.9),0_3px_8px_rgba(23,35,45,.3)]"
                : "border-line hover:scale-105",
            )}
            style={{ backgroundColor: s.value }}
          />
        ))}
      </div>
      <span
        className="mt-0.5 h-3 w-3 rounded-full border border-line"
        style={{ backgroundColor: activeValue }}
        aria-hidden="true"
      />
    </div>
  );
}
