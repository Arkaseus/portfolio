import { FadeUp } from "./FadeUp";
import { Layers, Database, Terminal, Cloud } from "lucide-react";

const SKILL_GROUPS = [
  {
    Icon: Layers,
    label: "Frontend",
    items: [
      "React.js", "React Native", "TypeScript",
      "JavaScript (ES6+)", "Redux", "Tailwind CSS", "HTML5 / CSS3",
    ],
  },
  {
    Icon: Database,
    label: "Backend & Data",
    items: [
      "Node.js", "Express.js", "REST API Design",
      "WebSockets (Socket.io)", "MongoDB", "MySQL", "Redis", "JWT / OAuth / RBAC", "Python"
    ],
  },
  {
    Icon: Terminal,
    label: "AI / LLM",
    items: [
      "OpenAI API (GPT-4o)", "Claude API (Anthropic)",
      "Prompt Engineering", "Structured Outputs",
      "Tool / Function Calling", "Model Context Protocol",
    ],
  },
  {
    Icon: Cloud,
    label: "Cloud & DevOps",
    items: [
      "AWS (EC2, S3, Lambda, RDS)", "Google Cloud Functions",
      "Docker", "CI/CD", "Git & GitHub", "Linux",
    ],
  },
];

export function Skills() {
  return (
    <section id="skills" className="py-24 sm:py-32 px-6 border-t border-zinc-800 border-opacity-40">
      <div className="max-w-6xl mx-auto">
        <FadeUp>
          <p className="text-xs text-emerald-400 tracking-widest uppercase font-bold mb-3">
            Technical Stack
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-zinc-50 tracking-tight mb-14">
            What I Work With
          </h2>
        </FadeUp>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SKILL_GROUPS.map(({ Icon, label, items }, i) => (
            <FadeUp key={label} delay={i * 0.08}>
              <div className="h-full rounded-xl border border-zinc-800 bg-zinc-900 bg-opacity-30 p-6 hover:border-zinc-700 transition-colors duration-200">
                <div className="flex items-center gap-2.5 mb-5">
                  <Icon size={13} className="text-emerald-400" />
                  <span className="text-xs text-zinc-300 font-bold tracking-widest uppercase">
                    {label}
                  </span>
                </div>
                <ul className="space-y-2.5">
                  {items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2.5 text-sm text-zinc-400"
                    >
                      <span className="w-1 h-1 rounded-full bg-zinc-700 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
