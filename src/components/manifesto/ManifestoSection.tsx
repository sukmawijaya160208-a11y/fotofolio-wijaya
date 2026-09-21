import { CodeUniverse } from "../universe/CodeUniverse";

export function ManifestoSection() {
  return (
    <section
      id="manifesto"
      className="relative w-full overflow-hidden bg-dark text-paper"
      aria-labelledby="manifesto-title"
    >
      <div
        className="pointer-events-none absolute left-6 top-20 z-30 font-mono text-[10px] tracking-[0.2em] text-paper/35 md:left-10"
        aria-hidden="true"
      >
        11 / CODE UNIVERSE
      </div>
      <h2 id="manifesto-title" className="sr-only">
        Wijaya Code Universe — tata surya teknologi
      </h2>
      <CodeUniverse />
    </section>
  );
}
