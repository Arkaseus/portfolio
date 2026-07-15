import { FadeUp } from "./FadeUp";
import { ProjectCard } from "./ProjectCard";

const PROJECTS = [
  {
    label: "Multi-Tenant IoT · Production SaaS",
    name: "Ratsense",
    body:
      "A multi-tenant, international rodent management IoT platform active across multiple countries. Spearheaded version 2 of the system, optimizing Node.js APIs (MySQL, S3, Canvas, PDF/CSV generation) and rewriting the React dashboard. Built robust admin controls (RBAC) to handle managing partners, clients, map layouts, and floorplans, and engineered serverless pipeline features on AWS (Lambda, API Gateway) and Google Cloud (BigQuery integration).",
    stack: [
      "React", "Node.js", "MySQL", "AWS Lambda", "AWS S3",
      "API Gateway", "Google BigQuery", "Cloud Functions", "Canvas API",
    ],
    stat: "V2 Performance Overhaul · Multi-Tenant RBAC",
    // github: "#",
    // demo: "#",
  },
  {
    label: "Production SaaS · AI-Integrated",
    name: "Smart Foundry",
    body:
      "A metal-casting client ran their entire production floor on fragile Google Sheets — no real-time visibility, no access control, manual reconciliation every single day. Smart Foundry replaced it: live production dashboards, GPT-4o vision reading values directly off physical instrument displays with structured validated output, a 4-level RBAC system for 100+ floor and admin users, and automated ERP sync via Google Cloud.",
    stack: [
      "Node.js", "Express", "React", "MongoDB", "Redis",
      "OpenAI GPT-4o", "Google Cloud", "Firebase Auth", "AWS",
    ],
    stat: "Shipped in 6.5 mo. vs. 12 mo. estimate",
    // github: "#",
    // demo: "#",
  },
  {
    label: "TypeScript · Full-Stack · Solo Build",
    name: "IdeaHub",
    body:
      "Developers at university had no dedicated place to share projects, find collaborators by skill, or track progress publicly. IdeaHub is a complete innovation platform: post ideas, vote, discover collaborators, track milestones, and compete on seasonal leaderboards. Designed, architected, and shipped entirely solo — TypeScript React frontend, Node.js/Express API, and MongoDB data layer.",
    stack: ["React", "TypeScript", "Node.js", "Express", "MongoDB", "JWT Auth"],
    stat: "Built solo · Complete feature set · End-to-end",
    github: "https://github.com/Arkaseus",
    demo: "#",
  },
];

export function Projects() {
  return (
    <section id="work" className="py-24 sm:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <FadeUp>
          <p className="text-xs text-emerald-400 tracking-widest uppercase font-bold mb-3">
            Selected Work
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-zinc-50 tracking-tight mb-3">
            Projects That Shipped
          </h2>
          <p className="text-zinc-500 text-base mb-14 max-w-lg leading-relaxed">
            End-to-end systems built for real operational problems — not demos.
          </p>
        </FadeUp>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.name} p={p} idx={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
