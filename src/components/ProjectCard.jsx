import { useState } from "react";
import { Github, ExternalLink } from "lucide-react";
import { useInView } from "../hooks/useInView";

export function ProjectCard({ p, idx }) {
  const [ref, inView] = useInView(0.08);
  const [hov, setHov] = useState(false);

  return (
    <article
      ref={ref}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: `opacity .5s ease ${idx * 0.13}s, transform .5s ease ${idx * 0.13}s`,
      }}
      className="relative rounded-2xl border border-zinc-800 bg-zinc-900 bg-opacity-30 p-7 sm:p-8 flex flex-col gap-5 hover:border-zinc-700 hover:bg-opacity-50 transition-all duration-300"
    >
      {/* hairline top-glow on hover */}
      <div
        style={{
          position: "absolute", top: 0, left: "2.5rem", right: "2.5rem", height: 1,
          background: "linear-gradient(90deg, transparent, rgba(16,185,129,.45), transparent)",
          opacity: hov ? 1 : 0, transition: "opacity .3s ease",
        }}
      />

      {/* header row */}
      <div className="flex items-start justify-between gap-3">
        <span className="text-xs font-bold text-emerald-400 tracking-widest uppercase">
          {p.label}
        </span>
        <div className="flex items-center gap-3 shrink-0">
         {p.github ? <a
            href={p.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-zinc-600 hover:text-zinc-300 transition-colors duration-200"
          >
            <Github size={15} />
          </a>
          :null}
          {p.demo ? <a
            href={p.demo}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Live Demo"
            className="text-zinc-600 hover:text-zinc-300 transition-colors duration-200"
          >
            <ExternalLink size={15} />
          </a>
          :null}
        </div>
      </div>

      <h3 className="text-2xl sm:text-3xl font-black text-zinc-50 tracking-tight leading-none">
        {p.name}
      </h3>

      <p className="text-zinc-400 text-sm leading-relaxed">{p.body}</p>

      {/* tech pills */}
      <div className="flex flex-wrap gap-2">
        {p.stack.map((t) => (
          <span
            key={t}
            className="text-xs font-mono px-2.5 py-1 rounded-md bg-zinc-800 text-zinc-400 border border-zinc-700 border-opacity-50"
          >
            {t}
          </span>
        ))}
      </div>

      {/* stat footer */}
      <div className="pt-4 border-t border-zinc-800 border-opacity-80 mt-auto">
        <span className="text-xs text-zinc-500 font-medium">{p.stat}</span>
      </div>
    </article>
  );
}
