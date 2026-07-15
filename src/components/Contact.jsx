import { FadeUp } from "./FadeUp";
import { Mail, Linkedin, Github, ExternalLink } from "lucide-react";

export function Contact() {
  const year = new Date().getFullYear();
  return (
    <footer
      id="contact"
      className="py-24 sm:py-32 px-6 border-t border-zinc-800 border-opacity-40"
    >
      <div className="max-w-6xl mx-auto">
        <FadeUp>
          <p className="text-xs text-emerald-400 tracking-widest uppercase font-bold mb-5">
            Get in Touch
          </p>
          <h2 className="text-4xl sm:text-5xl font-black text-zinc-50 leading-tight tracking-tight mb-5">
            Let's build something
            <br />
            <span className="text-zinc-600">compelling together.</span>
          </h2>
          <p className="text-zinc-400 text-base leading-relaxed mb-10 max-w-md">
            Open to full-time roles, and interesting engineering
            challenges. I respond within 24 hours.
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href="mailto:akashyadavbca@gmail.com"
              className="inline-flex items-center gap-2.5 px-6 py-3 bg-emerald-500 text-zinc-950 font-bold text-sm rounded-lg hover:bg-emerald-400 active:scale-95 transition-all duration-200"
            >
              <Mail size={14} />
              akashyadavbca@gmail.com
            </a>
            <a
              href="https://www.linkedin.com/in/akash-yadav-builds"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border border-zinc-700 text-zinc-300 text-sm font-medium rounded-lg hover:border-zinc-500 hover:text-zinc-50 transition-all duration-200"
            >
              <Linkedin size={14} />
              LinkedIn
              <ExternalLink size={11} className="text-zinc-600" />
            </a>
            <a
              href="https://github.com/Arkaseus"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border border-zinc-700 text-zinc-300 text-sm font-medium rounded-lg hover:border-zinc-500 hover:text-zinc-50 transition-all duration-200"
            >
              <Github size={14} />
              GitHub
              <ExternalLink size={11} className="text-zinc-600" />
            </a>
          </div>
        </FadeUp>

        {/* bottom bar */}
        <div className="mt-20 pt-8 border-t border-zinc-800 border-opacity-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <span className="text-zinc-600 text-xs">
            © {year} Akash Yadav · Prayagraj, India
          </span>
          <div className="flex items-center gap-6">
            {[
              ["https://github.com/Arkaseus", "GitHub"],
              ["https://www.linkedin.com/in/akash-yadav-builds", "LinkedIn"],
              ["mailto:akashyadavbca@gmail.com", "Email"],
            ].map(([href, label]) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="text-zinc-600 hover:text-zinc-400 transition-colors text-xs"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
