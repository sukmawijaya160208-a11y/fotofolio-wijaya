import { useEffect, useState } from "react";
import { navItems } from "../../data/contact";
import { profile } from "../../data/profile";
import { cx } from "../../lib/cx";

export function SectionNav() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    function onScroll() {
      const y = window.scrollY;
      if (y > 720 && y > last) setHidden(true);
      else setHidden(false);
      last = y;
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cx(
        "fixed inset-x-0 top-0 z-50 transition-transform duration-500",
        hidden ? "-translate-y-full" : "translate-y-0",
      )}
    >
      <div className="flex items-center justify-between px-6 py-4 md:px-10 lg:px-[clamp(40px,6vw,96px)]">
        <a
          href="#hero"
          className="font-display text-xl uppercase tracking-wide text-ink"
          aria-label="Kembali ke atas"
        >
          {profile.displayName}
        </a>
        <nav className="hidden items-center gap-7 md:flex" aria-label="Navigasi utama">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted transition-colors duration-200 hover:text-ink"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-sm border border-line bg-paper/70 backdrop-blur md:hidden"
          aria-expanded={open}
          aria-label={open ? "Tutup menu" : "Buka menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="text-lg leading-none">{open ? "×" : "≡"}</span>
        </button>
      </div>
      {open && (
        <nav
          className="flex flex-col gap-3 border-t border-line bg-paper/95 px-6 py-5 backdrop-blur md:hidden"
          aria-label="Navigasi mobile"
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="font-mono text-xs uppercase tracking-[0.16em] text-ink"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
