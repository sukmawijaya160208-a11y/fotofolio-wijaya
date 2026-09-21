import { SolarSystemSection } from "../solar/SolarSystemSection";

export function ManifestoSection() {
  return (
    <section
      id="manifesto"
      className="relative w-full overflow-hidden bg-[#030507] text-paper"
      aria-labelledby="manifesto-title"
    >
      <div
        className="pointer-events-none absolute left-6 top-20 z-30 font-mono text-[10px] tracking-[0.2em] text-paper/35 md:left-10"
        aria-hidden="true"
      >
        11 / SOLAR SYSTEM
      </div>
      <h2 id="manifesto-title" className="sr-only">
        Solar System Observatory — tata surya portfolio
      </h2>
      <SolarSystemSection />
    </section>
  );
}
