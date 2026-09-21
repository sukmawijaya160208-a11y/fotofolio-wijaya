import { useEffect, useState } from "react";
import { sectionIds } from "../../data/contact";
import { cx } from "../../lib/cx";

function indexToNumber(index: number) {
  return String(index + 1).padStart(2, "0");
}

export function ScrollProgress() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    function update() {
      const mid = window.innerHeight * 0.42;
      let current = 0;
      sections.forEach((el, i) => {
        const rect = el.getBoundingClientRect();
        if (rect.top <= mid) current = i;
      });
      setActive(current);
      const doc = document.documentElement;
      const scrolled = window.scrollY;
      const max = doc.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? scrolled / max : 0);
    }

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <>
      <div
        className="fixed left-0 top-0 z-[60] h-0.5 w-full origin-left bg-burgundy md:hidden"
        style={{ transform: `scaleX(${progress})` }}
        aria-hidden="true"
      />
      <nav
        className="fixed right-5 top-1/2 z-[60] hidden -translate-y-1/2 flex-col items-center gap-3.5 md:flex"
        aria-label="Navigasi section"
      >
        {sectionIds.map((id, i) => (
          <a
            key={id}
            href={`#${id}`}
            className="group flex items-center gap-2.5"
            aria-label={`Ke section ${indexToNumber(i)}`}
          >
            <span
              className={cx(
                "font-mono text-[9px] tracking-[0.15em] transition-all duration-300",
                active === i
                  ? "translate-x-0 text-ink opacity-100"
                  : "translate-x-1.5 text-muted opacity-0 group-hover:opacity-70",
              )}
            >
              {indexToNumber(i)}
            </span>
            <span
              className={cx(
                "block rounded-full transition-all duration-300",
                active === i
                  ? "h-5 w-[3px] bg-burgundy"
                  : "h-[3px] w-[3px] bg-tech/50 group-hover:bg-tech",
              )}
            />
          </a>
        ))}
      </nav>
    </>
  );
}
