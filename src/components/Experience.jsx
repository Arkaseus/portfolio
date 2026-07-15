import { FadeUp } from "./FadeUp";
import { ChevronRight } from "lucide-react";

const EXPERIENCES = [
  {
    company: "SimplifyS Digital Pvt. Ltd.",
    role: "Full-Stack Developer",
    period: "June 2023 – Present",
    meta: "Full-time · Remote, India",
    bullets: [
      "Led end-to-end development of Smart Foundry — a production-tracking SaaS for a metal-casting client. Owned the complete stack: Node.js/Express APIs, React + Tailwind frontend, MongoDB schema design, and Redis caching on high-traffic endpoints.",
      "Integrated OpenAI GPT-4o vision models to read measurements directly from industrial instrument displays; engineered prompts for structured, validated output with explicit accuracy checks and error handling.",
      "Built Ratsense — a high-traffic Node.js/MySQL backend on AWS, cutting API response times 60% (600 ms → 200 ms). Shipped a modular admin panel covering 6+ entities with 4-level RBAC.",
      "Implemented Google/Firebase OAuth, role-based access for 100+ users, automated daily ERP sync (Google Cloud Functions + Scheduler), and SMTP reporting — eliminating daily manual reconciliation.",
    ],
  },
  {
    company: "Freelance Collaboration",
    role: "React Native Developer",
    period: "Jan 2025 – Feb 2026",
    meta: "Contract · Remote, US-based client",
    bullets: [
      "Contributed Android screens to a US-based mobile payments application — wired React Native UI to backend REST APIs using Redux for predictable, testable state management.",
      "Optimised rendering performance and navigation flows through the product's pilot launch, collaborating closely on API testing and bug-fixing.",
    ],
  },
];

export function Experience() {
  return (
    <section id="experience" className="py-24 sm:py-32 px-6 border-t border-zinc-800 border-opacity-40">
      <div className="max-w-6xl mx-auto">
        <FadeUp>
          <p className="text-xs text-emerald-400 tracking-widest uppercase font-bold mb-3">
            Experience
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-zinc-50 tracking-tight mb-14">
            Professional Timeline
          </h2>
        </FadeUp>

        <div className="relative">
          {/* vertical guide line */}
          <div className="absolute left-0 top-2 bottom-0 w-px bg-zinc-800 hidden sm:block" />

          <div className="flex flex-col gap-14">
            {EXPERIENCES.map((exp, i) => (
              <FadeUp key={i} delay={i * 0.1} className="relative sm:pl-10">
                {/* timeline dot */}
                <div
                  className="absolute -left-1 top-2 hidden sm:block w-2.5 h-2.5 rounded-full border-2 border-emerald-500 bg-zinc-950"
                  style={{ left: "-5px" }}
                />

                <div className="flex flex-col sm:flex-row sm:justify-between gap-1 mb-5">
                  <div>
                    <h3 className="text-zinc-50 font-bold text-lg leading-tight">
                      {exp.role}
                    </h3>
                    <p className="text-emerald-400 text-sm font-semibold">{exp.company}</p>
                  </div>
                  <div className="sm:text-right shrink-0">
                    <p className="text-zinc-400 text-sm">{exp.period}</p>
                    <p className="text-zinc-600 text-xs mt-0.5">{exp.meta}</p>
                  </div>
                </div>

                <ul className="space-y-3">
                  {exp.bullets.map((b, j) => (
                    <li key={j} className="flex gap-3 text-sm text-zinc-400 leading-relaxed">
                      <ChevronRight
                        size={13}
                        className="text-emerald-500 mt-0.5 shrink-0"
                        style={{ opacity: 0.8 }}
                      />
                      {b}
                    </li>
                  ))}
                </ul>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
