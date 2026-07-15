import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const NAV_LINKS = ["Work", "Experience", "Skills", "Contact"];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open,     setOpen]     = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const go = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled ? "bg-zinc-950 bg-opacity-80 backdrop-blur-md border-b border-zinc-800 border-opacity-50" : ""
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <span className="text-zinc-50 font-black text-xl tracking-tight select-none">
          AY<span className="text-emerald-400">.</span>
        </span>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <button
              key={l}
              onClick={() => go(l)}
              className="text-sm text-zinc-400 hover:text-zinc-100 transition-colors duration-200 font-medium"
            >
              {l}
            </button>
          ))}
          <a
            href="mailto:akashyadavbca@gmail.com"
            className="text-sm font-semibold px-4 py-2 rounded-lg border border-zinc-700 text-zinc-300 hover:border-emerald-500 hover:border-opacity-60 hover:text-white transition-all duration-200"
          >
            Hire Me
          </a>
        </nav>

        <button
          className="md:hidden text-zinc-400 hover:text-zinc-200 transition-colors"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-zinc-950 bg-opacity-95 backdrop-blur-md border-b border-zinc-800">
          <nav className="max-w-6xl mx-auto px-6 py-5 flex flex-col gap-3">
            {NAV_LINKS.map((l) => (
              <button
                key={l}
                onClick={() => go(l)}
                className="text-left text-zinc-300 hover:text-zinc-50 py-1.5 text-sm font-medium transition-colors"
              >
                {l}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
