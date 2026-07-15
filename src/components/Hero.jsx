import { useTypewriter } from "../hooks/useTypewriter";
import { Github, Linkedin, Mail, ExternalLink, ArrowDown } from "lucide-react";

export function Hero() {
  const { out, done } = useTypewriter(
    "Building clean, scalable, and high-performance full-stack web applications."
  );

  const scrollToWork = () =>
    document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="min-h-screen flex items-center px-6 pt-20 pb-16 max-w-6xl mx-auto">
      <div className="w-full">
        {/* availability badge */}
        <div
          className="flex items-center gap-2.5 mb-8"
          style={{ animation: "fadeUp .55s ease .1s both" }}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-dot" />
          <span className="text-xs text-zinc-500 tracking-widest uppercase font-semibold">
            Full-Stack Developer · Node.js, React & AI/LLM Integration
          </span>
        </div>

        {/* typewriter headline */}
        <h1
          className="text-4xl sm:text-5xl xl:text-6xl font-black text-zinc-50 leading-tight tracking-tight mb-8 max-w-3xl"
          style={{ minHeight: "13rem" }}
        >
          {out}
          {!done && (
            <span
              className="inline-block w-0.5 bg-emerald-400 ml-1 align-middle animate-blink"
              style={{ height: "0.9em" }}
            />
          )}
        </h1>

        {/* bio */}
        <p
          className="text-zinc-400 text-base sm:text-lg leading-relaxed max-w-xl mb-10"
          style={{ animation: "fadeUp .55s ease 1.15s both", opacity: 0 }}
        >
          I'm{" "}
          <span className="text-zinc-200 font-semibold">Akash Yadav</span> — a
          full-stack developer with 3+ years in production. I architect
          Node.js backends, build fast React interfaces, and wire LLMs into
          real product features at{" "}
          <span className="text-zinc-300">SimplifyS Digital</span>.
        </p>

        {/* CTAs */}
        <div
          className="flex flex-wrap gap-3 mb-14"
          style={{ animation: "fadeUp .55s ease 1.35s both", opacity: 0 }}
        >
          <button
            onClick={scrollToWork}
            className="group flex items-center gap-2 px-6 py-3 bg-emerald-500 text-zinc-950 font-bold text-sm rounded-lg hover:bg-emerald-400 active:scale-95 transition-all duration-200"
          >
            View Work
            <ArrowDown
              size={14}
              className="group-hover:translate-y-0.5 transition-transform duration-200"
            />
          </button>
          <a
            href="https://drive.google.com/file/d/1njYK8tt2VEfWkjYu5YwmCujb7cIRvZZH/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 border border-zinc-700 text-zinc-300 text-sm font-medium rounded-lg hover:border-zinc-500 hover:text-zinc-50 transition-all duration-200"
          >
            Resume <ExternalLink size={12} className="text-zinc-500" />
          </a>
        </div>

        {/* social row */}
        <div
          className="flex items-center gap-5"
          style={{ animation: "fadeUp .55s ease 1.55s both", opacity: 0 }}
        >
          {[
            { href: "https://github.com/Arkaseus", Icon: Github,   label: "GitHub" },
            { href: "https://www.linkedin.com/in/akash-yadav-builds", Icon: Linkedin, label: "LinkedIn" },
            { href: "mailto:akashyadavbca@gmail.com",  Icon: Mail,     label: "Email" },
          ].map(({ href, Icon, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              aria-label={label}
              className="text-zinc-600 hover:text-zinc-200 transition-colors duration-200"
            >
              <Icon size={19} />
            </a>
          ))}
          <div className="w-10 h-px bg-zinc-800" />
          <span className="text-xs text-zinc-600 font-medium">
            Prayagraj, India · Open to remote
          </span>
        </div>
      </div>
    </section>
  );
}
