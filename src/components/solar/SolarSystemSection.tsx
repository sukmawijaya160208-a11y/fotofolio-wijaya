import {
  Component,
  Suspense,
  lazy,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useReducedMotion } from "framer-motion";
import { OBSERVATORY, TEXTURE_CREDIT, celestialBodies } from "../../data/solarSystem";
import { portfolioTargets, targetById } from "../../data/portfolioMap";
import { useInView } from "../../lib/useInView";
import { LIME } from "./solarTheme";

const SolarSystemCanvas = lazy(() =>
  import("./SolarSystemScene").then((m) => ({ default: m.SolarSystemCanvas })),
);

const ORDER = ["sun", ...celestialBodies.map((b) => b.id)];

class SolarErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    if (this.state.failed) return <SolarFallback />;
    return this.props.children;
  }
}

function SolarFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[#030507] p-8">
      <div className="w-full max-w-[560px] rounded-[10px] border border-white/12 bg-black/70 p-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#F3F5F7]/60">
          WEBGL UNAVAILABLE — DATA MODE
        </p>
        <h3 className="font-observatory mt-3 text-2xl uppercase text-[#F3F5F7]">
          {OBSERVATORY.title}
        </h3>
        <ul className="mt-5 flex flex-col gap-px">
          {portfolioTargets.map((t) => (
            <li
              key={t.id}
              className="flex items-baseline justify-between gap-3 border-b border-white/8 py-2 last:border-0"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#F3F5F7]/85">
                {t.title}
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#78818B]">
                {t.status}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Loader({ pct, active }: { pct: number; active: boolean }) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (!active && pct >= 100) {
      const id = setTimeout(() => setReady(true), 450);
      return () => clearTimeout(id);
    }
  }, [active, pct]);
  if (ready) return null;
  return (
    <div className="absolute inset-0 z-40 flex flex-col items-center justify-center gap-4 bg-[#030507]">
      <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#F3F5F7]/70">
        INITIALIZING OBSERVATORY
      </p>
      <div className="h-[3px] w-[min(280px,60vw)] overflow-hidden rounded bg-white/10">
        <div
          className="h-full bg-[#C7FF3D] transition-[width] duration-200"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="font-mono text-[10px] tracking-[0.2em] text-[#78818B]">
        {active || pct < 100 ? `LOADING CELESTIAL DATA — ${pct}%` : "SYSTEM READY"}
      </p>
    </div>
  );
}

function TargetPanel({
  selectedId,
  onClose,
}: {
  selectedId: string;
  onClose: () => void;
}) {
  const t = targetById(selectedId);
  if (!t) return null;
  const pending = t.status === "PENDING";
  return (
    <div className="absolute bottom-4 left-4 right-4 z-40 rounded-[10px] border border-white/12 bg-black/75 p-4 backdrop-blur-md md:bottom-auto md:left-auto md:right-8 md:top-1/2 md:w-[290px] md:-translate-y-1/2">
      <div className="mb-1 h-[2px] w-8" style={{ background: LIME }} aria-hidden="true" />
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-[#78818B]">
            TARGET
          </p>
          <p className="font-observatory mt-1 text-xl uppercase leading-none text-[#F3F5F7]">
            {t.title}
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Tutup panel target (Esc)"
          className="font-mono text-[10px] text-[#78818B] transition-colors hover:text-[#F3F5F7]"
        >
          ESC ✕
        </button>
      </div>
      <dl className="mt-3 grid grid-cols-2 gap-2 border-y border-white/10 py-2.5">
        <div>
          <dt className="font-mono text-[8px] uppercase tracking-[0.18em] text-[#78818B]">CATEGORY</dt>
          <dd className="mt-0.5 font-mono text-[9.5px] uppercase tracking-[0.1em] text-[#F3F5F7]/85">{t.category}</dd>
        </div>
        <div>
          <dt className="font-mono text-[8px] uppercase tracking-[0.18em] text-[#78818B]">STATUS</dt>
          <dd
            className="mt-0.5 font-mono text-[9.5px] uppercase tracking-[0.1em]"
            style={{ color: pending ? "#C5CBD2" : LIME }}
          >
            {t.status}
          </dd>
        </div>
      </dl>
      <p className="mt-2.5 text-[12px] leading-relaxed text-[#C5CBD2]/80">{t.description}</p>
      {t.technologies && (
        <p className="mt-2.5 font-mono text-[9px] uppercase leading-relaxed tracking-[0.12em] text-[#78818B]">
          RELATED — {t.technologies.join(" · ")}
        </p>
      )}
      <a
        href={t.href}
        className="mt-3.5 inline-flex items-center gap-2 rounded-[6px] border px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.16em] transition-colors"
        style={{ borderColor: `${LIME}55`, color: LIME }}
      >
        {t.cta} →
      </a>
    </div>
  );
}

export function SolarSystemSection() {
  const reduce = useReducedMotion();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const mountRef = useRef<HTMLDivElement | null>(null);
  const { ref: inViewRef, inView } = useInView<HTMLDivElement>({
    threshold: 0.05,
    rootMargin: "300px 0px",
  });
  const [load, setLoad] = useState({ pct: 0, active: true });
  const onLoad = useCallback((pct: number, active: boolean) => {
    setLoad((prev) => (prev.pct === pct && prev.active === active ? prev : { pct, active }));
  }, []);

  const step = useCallback((dir: 1 | -1) => {
    setSelectedId((cur) => {
      const i = cur ? ORDER.indexOf(cur) : dir === 1 ? -1 : 0;
      return ORDER[(i + dir + ORDER.length) % ORDER.length];
    });
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = mountRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const visible = r.top < window.innerHeight * 0.7 && r.bottom > window.innerHeight * 0.3;
      if (!visible) return;
      if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
      else if (e.key === "Escape") setSelectedId(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [step]);

  const activeName = selectedId
    ? (targetById(selectedId)?.title ?? selectedId.toUpperCase())
    : "—";

  return (
    <div ref={mountRef} className="relative h-[100svh] min-h-[640px] bg-[#030507]">
      <div ref={inViewRef} className="absolute inset-0 overflow-hidden">
        <SolarErrorBoundary>
          {inView && (
            <Suspense fallback={null}>
              <SolarSystemCanvas
                reduce={!!reduce}
                quality="high"
                selectedId={selectedId}
                onSelect={setSelectedId}
                onLoad={onLoad}
              />
            </Suspense>
          )}
        </SolarErrorBoundary>

        {/* Static title — always visible, no scroll choreography */}
        <div className="pointer-events-none absolute inset-x-0 top-0 flex flex-col items-center px-6 pt-24 text-center md:pt-20">
          <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#F3F5F7]/55 md:text-[10px]">
            {OBSERVATORY.eyebrow}
          </p>
          <h3 className="font-observatory mt-3 text-[clamp(34px,6vw,84px)] uppercase leading-[0.9] text-[#F3F5F7]">
            {OBSERVATORY.title}
          </h3>
          <p className="mt-3 max-w-[440px] text-[12px] leading-relaxed text-[#C5CBD2]/70 md:text-[13px]">
            {OBSERVATORY.sub}
          </p>
        </div>

        {/* Observatory HUD */}
        <div className="pointer-events-none absolute left-6 top-16 flex flex-col gap-1.5 md:left-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#F3F5F7]/80">
            MW / OBSERVATORY
          </p>
          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#78818B]">
            SECTION 11
          </p>
        </div>
        <div className="pointer-events-none absolute right-6 top-16 flex flex-col items-end gap-1.5 md:right-10">
          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#78818B]">
            SYSTEM
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.24em]" style={{ color: LIME }}>
            ● {OBSERVATORY.status}
          </p>
        </div>
        <div className="absolute bottom-6 left-6 flex flex-col gap-3 md:left-10">
          <p className="pointer-events-none font-mono text-[9px] uppercase tracking-[0.22em] text-[#78818B]">
            DRAG TO ORBIT · SCROLL TO ZOOM · CLICK TO FOCUS
          </p>
          <div className="pointer-events-auto flex items-center gap-2">
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Target sebelumnya"
              className="rounded-[6px] border border-white/15 px-3 py-2 font-mono text-[11px] text-[#C5CBD2] transition-colors hover:border-white/40"
            >
              ◀
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Target berikutnya"
              className="rounded-[6px] border border-white/15 px-3 py-2 font-mono text-[11px] text-[#C5CBD2] transition-colors hover:border-white/40"
            >
              ▶
            </button>
          </div>
        </div>
        <div className="pointer-events-none absolute bottom-6 right-6 flex flex-col items-end gap-1.5 md:right-10">
          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#78818B]">
            09 OBJECTS
          </p>
          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#78818B]">
            ACTIVE TARGET —{" "}
            <span style={{ color: selectedId ? LIME : "#C5CBD2" }}>{activeName}</span>
          </p>
          <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-[#4C555F]">
            {OBSERVATORY.scaleNote}
          </p>
        </div>

        {selectedId && <TargetPanel selectedId={selectedId} onClose={() => setSelectedId(null)} />}

        {inView && <Loader pct={load.pct} active={load.active} />}

        {/* SEO + screen-reader content */}
        <div className="sr-only">
          <h3>{OBSERVATORY.title} — {OBSERVATORY.sub}</h3>
          <p>{OBSERVATORY.scaleNote}</p>
          <p>{TEXTURE_CREDIT}</p>
          <ul>
            {portfolioTargets.map((t) => (
              <li key={t.id}>
                {t.title} — {t.category}, {t.status}: {t.description}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
